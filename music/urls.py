
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    TrackApiView,
    GenreListApiView,
    GenreDetailApiView,
    GenreCreateApiView,
    )

urlpatterns = [

    # genre api view urls
    url(r'^genre/$',GenreListApiView.as_view(),name="genre-list"),
    url(r'^genre/create/$', GenreCreateApiView.as_view(), name='genre-create'),
    url(r'^genre/(?P<pk>\d+)$',GenreDetailApiView.as_view(),name='genre-detail'),
    
    # track api view urls
    url(r'^track/$',csrf_exempt(TrackApiView.as_view({'get':'list'})), name='track-list'),
    url(r'^track/create/$',csrf_exempt(TrackApiView.as_view({'post':'create_new_track'})), name='create-track'),
    url(r'^track/update/$',csrf_exempt(TrackApiView.as_view({'post':'update'})), name='track-update'),
    
    
     

]
