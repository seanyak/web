from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create, name="create"),
    path("catSelect", views.catSelect, name="catSelect"),
    path("listing/<int:id>", views.listing, name="listing"),
    path("rmWatchlist/<int:id>", views.rmWatchlist, name="rmWatchlist"),
    path("adWatchlist/<int:id>", views.adWatchlist, name="adWatchlist"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("adCom/<int:id>", views.adCom, name="adCom"),
    path("bid/<int:id>", views.bid, name="bid"),
    path("close/<int:id>", views.close, name="close")
]
