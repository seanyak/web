from sre_constants import CATEGORY
from unicodedata import category
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required


from .models import User, Category, Bid, Listing, Comment

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["user"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def index(request):
    activeListings = Listing.objects.filter(active=True)
    catAll = Category.objects.all()
    return render(request, "auctions/index.html", {
        "listing": activeListings,
        "categories": catAll
    })

@login_required
def create(request):
    if request.method == "GET":
        catAll = Category.objects.all()
        return render(request, "auctions/create.html", {
            "categories": catAll
        })
    else:
        title = request.POST["title"]
        description = request.POST["description"]
        imgUrl = request.POST["imageUrl"]
        price = request.POST["price"]
        category = request.POST["category"]
        curUser = request.user
        catData = Category.objects.get(catName=category)
        bid = Bid(bid=int(price), user=curUser)
        bid.save()
        newListing = Listing(
            title=title,
            description=description,
            imageUrl=imgUrl,
            price=bid,
            category=catData,
            owner=curUser
        )
        newListing.save()
        return HttpResponseRedirect(reverse(index))

def listing(request, id):
    listingData = Listing.objects.get(pk=id)
    watching = request.user in listingData.watchlist.all()
    allCom = Comment.objects.filter(listing=listingData)
    owner = request.user.username == listingData.owner.username
    return render(request, "auctions/listing.html", {
        "listing": listingData,
        "watching": watching,
        "allCom": allCom,
        "owner": owner
    })

@login_required
def bid(request, id):
    newBid = request.POST['newBid']
    listingData = Listing.objects.get(pk=id)
    watching = request.user in listingData.watchlist.all()
    allCom = Comment.objects.filter(listing=listingData)
    owner = request.user.username == listingData.owner.username
    if int(newBid) > listingData.price.bid:
        update = Bid(user=request.user, bid=int(newBid))
        update.save()
        listingData.price = update
        listingData.save()
        return render(request, "auctions/listing.html", {
            "listing": listingData,
            "message": "Bid successful!",
            "update": True,
            "watching": watching,
            "allCom": allCom,
            "owner": owner
        })
    else:
        return render(request, "auctions/listing.html", {
            "listing": listingData,
            "message": "Bid failed!",
            "update": False,
            "watching": watching,
            "allCom": allCom,
            "owner": owner
        })

@login_required
def watchlist(request):
    curUser = request.user
    listings = curUser.watchlist.all()
    return render(request, "auctions/watchlist.html", {
        "listings": listings
    })

@login_required
def adWatchlist(request, id):
    listingData = Listing.objects.get(pk=id)
    curUser = request.user
    listingData.watchlist.add(curUser)
    return HttpResponseRedirect(reverse("listing", args=(id, )))

@login_required
def rmWatchlist(request, id):
    listingData = Listing.objects.get(pk=id)
    curUser = request.user
    listingData.watchlist.remove(curUser)
    return HttpResponseRedirect(reverse("listing", args=(id, )))

@login_required
def adCom(request, id):
    curUser = request.user
    listingData = Listing.objects.get(pk=id)
    message = request.POST['newCom']
    newCom = Comment(
        author=curUser,
        listing=listingData,
        message=message
    )
    newCom.save()
    return HttpResponseRedirect(reverse("listing", args=(id, )))

def catSelect(request):
    if request.method == "POST":
        catSelected = request.POST['category']
        category = Category.objects.get(catName=catSelected)
        filteredListing = Listing.objects.filter(active=True, category=category)
        catAll = Category.objects.all()
        return render(request, "auctions/index.html", {
            "listing": filteredListing,
            "categories": catAll,
        })

@login_required
def close (request, id):
    listingData = Listing.objects.get(pk=id)
    listingData.active = False
    listingData.save()
    watching = request.user in listingData.watchlist.all()
    allCom = Comment.objects.filter(listing=listingData)
    owner = request.user.username == listingData.owner.username
    return render(request, "auctions/listing.html", {
        "listing": listingData,
        "watching": watching,
        "allCom": allCom,
        "owner": owner,
        "update": True,
        "message": "Auction closed!"
    })