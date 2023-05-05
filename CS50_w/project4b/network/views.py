from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator
from .models import User, Post, Follow, Like
import json


def index(request):
    allPosts = Post.objects.all().order_by("id").reverse()

    paginator = Paginator(allPosts, 10)
    pageNum = request.GET.get('page')
    postsPage = paginator.get_page(pageNum)

    allLiked = Like.objects.all()

    userLiked = []
    try:
        for like in allLiked:
            if like.user.id == request.user.id:
                userLiked.append(like.post.id)
    except:
        userLiked = []

    return render(request, "network/index.html", {
        "allPosts": allPosts,
        "postsPage": postsPage,
        "userLiked": userLiked,
    })


def newPost(request):
    if request.method == "POST":
        content = request.POST["content"]
        user = User.objects.get(pk=request.user.id)
        post = Post(content=content, user=user)
        post.save()
        return HttpResponseRedirect(reverse(index))


def edit(request, user_id):
    if request.method == "POST":
        data = json.loads(request.body)
        editPost = Post.objects.get(pk=user_id)
        editPost.content = data["content"]
        editPost.save()
        return JsonResponse({"message": "Edit was saved successfully!", "data": data["content"]})


def addLike(request, user_id):
    post = Post.objects.get(pk=user_id)
    user = User.objects.get(pk=request.user.id)
    newLike = Like(user=user, post=post)
    newLike.save()
    return JsonResponse({"message": "Liked!"})


def remLike(request, user_id):
    post = Post.objects.get(pk=user_id)
    user = User.objects.get(pk=request.user.id)
    like = Like.objects.filter(user=user, post=post)
    like.delete()
    return JsonResponse({"message": "Unliked!"})


def follow(request):
    userfollow = request.POST['userfollow']
    currUser = User.objects.get(pk=request.user.id)
    userfollowData = User.objects.get(username=userfollow)
    f = Follow(user=currUser, followed=userfollowData)
    f.save()
    user_id = userfollowData.id
    return HttpResponseRedirect(reverse(profile, kwargs={'user_id': user_id}))


def unfollow(request):
    userfollow = request.POST['userfollow']
    currUser = User.objects.get(pk=request.user.id)
    userfollowData = User.objects.get(username=userfollow)
    f = Follow.objects.get(user=currUser, followed=userfollowData)
    f.delete()
    user_id = userfollowData.id
    return HttpResponseRedirect(reverse(profile, kwargs={'user_id': user_id}))


def following(request):
    currUser = User.objects.get(pk=request.user.id)
    followingUsers = Follow.objects.filter(user=currUser)
    allPosts = Post.objects.all().order_by('id').reverse()
    followingPosts = []

    for post in allPosts:
        for person in followingUsers:
            if person.followed == post.user:
                followingPosts.append(post)

    paginator = Paginator(followingPosts, 10)
    pageNum = request.GET.get('page')
    postsPage = paginator.get_page(pageNum)
    
    return render(request, "network/following.html", {
        "postsPage": postsPage
    })


def profile(request, user_id):
    user = User.objects.get(pk=user_id)
    allPosts = Post.objects.filter(user=user).order_by("id").reverse()

    followingUser = Follow.objects.filter(user=user)
    followers = Follow.objects.filter(followed=user) 

    try:
        checkFollowing = Follow.objects.filter(user=User.objects.get(pk=request.user.id))
        if len(checkFollowing) != 0:
            isFollowing = True
        else:
            isFollowing = False
    except:
        isFollowing = False

    paginator = Paginator(allPosts, 10)
    pageNum = request.GET.get('page')
    postsPage = paginator.get_page(pageNum)

    return render(request, "network/profile.html", {
        "allPosts": allPosts,
        "postsPage": postsPage,  
        "username": user.username,
        "following": followingUser,
        "followers": followers,
        "isFollowing": isFollowing,
        "userProf": user
    })


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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")