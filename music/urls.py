
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    TrackCreateApiView,
    TrackDeleteApiView,
    TrackDetailApiView,
    TrackListApiView,
    TrackUpdateApiView,
    GenreListApiView,
    GenreCreateApiView
    )

urlpatterns = [
    url(r'^track/$', TrackListApiView.as_view(), name='list'),
    url(r'^track/create/$', TrackCreateApiView.as_view(), name='create'),
    url(r'^track/(?P<pk>[0-9]+)/$', TrackDetailApiView.as_view(), name='detail'),
    url(r'^track/(?P<pk>[0-9]+)/edit/$', TrackUpdateApiView.as_view(), name='update'),
    url(r'^track/(?P<pk>[0-9]+)/delete/$', TrackDeleteApiView.as_view(), name='delete'),


    # genre api view
    url(r'^genre/$',GenreListApiView.as_view(),name="genre-list"),
    url(r'^genre/create/$', GenreCreateApiView.as_view(), name='genre-create'),
# 
]
