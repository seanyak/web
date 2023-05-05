from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create, name="create"),
    path("listing/<int:id>", views.listing, name="listing"),
    path("bid/<int:id>", views.bid, name="bid"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("adWatchlist/<int:id>", views.adWatchlist, name="adWatchlist"),
    path("rmWatchlist/<int:id>", views.rmWatchlist, name="rmWatchlist"),
    path("adCom/<int:id>", views.adCom, name="adCom"),
    path("catSelect", views.catSelect, name="catSelect"),
    path("close/<int:id>", views.close, name="close")
]
