from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userLiked")
    post = models.ForeignKey(User, on_delete=models.CASCADE, related_name="postLiked")

    def __str__(self):
        return f"{self.user} liked {self.post}"


class Post(models.Model):
    #creator of post
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    #contents of post/timestamp/amount of likes 
    content = models.CharField(max_length=420, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(Like, blank=True, related_name="userLikes")

    def __str__(self):
        return f"Post {self.id} by {self.user} on {self.date.strftime('%b %d %Y, %H:%M:%S')}"


class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followingUser") #user_who_is_following
    #user_follower
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followedUser") #user_who_is_being_followed

    def __str__(self):
        return f"{self.user} follows {self.followed}"



