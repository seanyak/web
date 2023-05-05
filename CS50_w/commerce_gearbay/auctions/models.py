from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Category(models.Model):
    categoryName = models.CharField(max_length=47)
    
    def __str__(self):
        return self.categoryName 

class Bid(models.Model):
    bid = models.IntegerField(default=0)
    user =models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="bidId")

class Listing(models.Model):
    title = models.CharField(max_length=42)
    description = models.CharField(max_length=420)
    price = models.ForeignKey(Bid, on_delete=models.CASCADE, blank=True, null=True, related_name="curBid")
    imageUrl = models.CharField(max_length=666)
    active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="user")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True, related_name="category")
    watchlist = models.ManyToManyField(User, blank=True, null=True, related_name="watchlist")

    def __str__(self):
        return self.title

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="userCom")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, blank=True, null=True, related_name="listingCom")
    message = models.CharField(max_length=420)

    def __str__(self):
        return f"{self.author} comment on {self.listing}"
