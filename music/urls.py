
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns
from views import TracksViewApi,GenreViewApi


urlpatterns = [
    url(r'^track/$',csrf_exempt(TracksViewApi.as_view()),name='track-list'),
    # url(r'^add_new_track/$',csrf_exempt(TracksViewApi.as_view({'post': 'create_new_track'})),name='add-new-track'),
    # url(r'^track/(?P<track_id>.+)$',csrf_exempt(TracksViewApi.as_view({'get': 'track_detail'})),name='track-detail'),
    # url(r'^edit/track/$',csrf_exempt(TracksViewApi.as_view({'post': 'update'})),name='edit-track'),
    
    url(r'^genre/$',csrf_exempt(GenreViewApi.as_view()),name='genre-list'),
    # # url(r'^create-genre/$',csrf_exempt(GenreViewSet.as_view({'post': 'create'})),name='create_genre'),
    # # url(r'^get-single-genre/(?P<genre_id>.+)$',csrf_exempt(GenreViewSet.as_view({'get': 'retrieve'})),name='get_single_genre'),
    # url(r'^edit/genre/$',csrf_exempt(GenreViewApi.as_view({'post': 'update'})),name='edit-genre'),



]


