
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    TrackApiView,
    GenreApiView,
    )

urlpatterns = [
    url(r'^track/$', csrf_exempt(TrackApiView.as_view({'get':'list'})), name='track-list'),
    url(r'^track/create/$',csrf_exempt(TrackApiView.as_view({'post':'create_new_track'})), name='create-track'),
    # url(r'^track/(?P<track_id>\d+)$',csrf_exempt(TrackApiView.as_view({'get':'track_detail'})), name='track-detail'),
    # url(r'^track/update/$',csrf_exempt(TrackApiView.as_view({'post':'update'})), name='track-update'),
    
    # genre api view
    url(r'^genre/$',csrf_exempt(GenreApiView.as_view({'get': 'list'})),name="genre-list"),
    url(r'^genre/create/$', csrf_exempt(GenreApiView.as_view({'post': 'create'})), name='genre-create'),
    # url(r'^genre/(?P<genre_id>.+)$',csrf_exempt(GenreApiView.as_view({'get': 'retrieve'})),name='genre-retrieve'),
    # url(r'^genre/update/$',csrf_exempt(GenreApiView.as_view({'post': 'update'})),name='update-genre'), 

]
