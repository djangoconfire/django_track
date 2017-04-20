from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework import generics
from models import Tracks,Music
import json
from genre.models import Genre

from django.db.models import Q
from django.utils import timezone

from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )

from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    DestroyAPIView,
    ListAPIView, 
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView
)

from .pagination import TrackLimitOffsetPagination, TrackPageNumberPagination
from serializers import TrackSerializer,GenreSerializer

class GenreListApiView(ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = TrackPageNumberPagination

class GenreCreateApiView(CreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]    

class GenreDetailApiView(RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny] 
    lookup_field='pk'  


class GenreDeleteApiView(DestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    lookup_field = 'pk'     


    def get_genre(self,request,*args,**kwargs):
        print 'inside getting genre'
        try:
            genre_dict={}
            genre_id = kwargs['genre_id']
            genre_instance = Genre.objects.get(id=genre_id)
            genre_dict['id'] = genre_instance.id
            genre_dict['name'] = genre_instance.name
            return Response({"results":genre_dict},status=status.HTTP_200_OK)
        except:
            return Response(status=HTTP_200_OK)


class TrackApiView(ModelViewSet):
    queryset = Tracks.objects.all().order_by('-pk')
    serializer_class = TrackSerializer
    permission_classes = [permissions.AllowAny]

    def list(self,request,*args,**kwargs):
        print 'fetching track data'
        track_data = []
        track_instance = Tracks.objects.all()
        for track in track_instance:
            track_dict = {}
            track_dict['id']=track.id
            track_dict['title'] = track.title
            track_dict['rating'] = track.rating
            genre_list = []
            genre_instance = Music.objects.filter(track=track)
            for genre in genre_instance:
                genre_dict = {}
                genre_dict['id']=genre.genre.id
                genre_dict['name']=genre.genre.name
                genre_list.append(genre_dict)
            track_dict['genre'] = genre_list
            track_data.append(track_dict)

        return Response({"results":track_data},status=HTTP_200_OK)


    def create_new_track(self,request,*args,**kwargs):
        print 'inside create new track'
        try:
            title = request.POST['title']
            print title
            rating = request.POST['rating']
            genre_list = request.POST.get('genre')
            genre_list = json.loads(genre_list)

            tracks_instance = Tracks.objects.create(title=title,rating=rating)
            for genre_id in genre_list:
                try:
                    genre_instance = Genre.objects.get(id=genre_id)
                    Music.objects.create(track=tracks_instance,genre=genre_instance)
                except:
                    pass
            return Response(status=HTTP_200_OK)

        except:
            return Response(status=HTTP_400_BAD_REQUEST)

    def track_detail(self,request,*args,**kwargs):
        print 'inside track detail'
        try:
            track_data = {}
            track_id = kwargs['track_id']
            track_instance = Tracks.objects.get(id=track_id)
            track_data['id']=track_instance.id
            track_data['name']= track_instance.title
            track_data['rating']= track_instance.rating
            music_instance = Music.objects.filter(track=track_instance)
            genre_list = []
            for genre in music_instance:
                genre_data = {}
                genre_data['pk'] = genre.genre.id
                genre_data['name'] = genre.genre.name
                genre_list.append(genre_data)
            track_data['genre']= genre_list

            return Response({"results":track_data})
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
        



    def update_track(self,request,*args,**kwarsg):
        print 'inside updating track data'
        try:
            title = request.POST['title']
            print title
            rating = request.POST['rating']
            track_id = request.POST['track_id']
            track_instance= Tracks.objects.get(id=track_id)
            genres_data = request.POST['genre']
            print genres_data
            print 'debugging'
            genres_data = json.loads(genres_data)
            print genres_data
            # Music.objects.filter(track=track_instance).delete()
            track_instance.title = title
            track_instance.rating = rating

            for genre_item in genres_data:
                print genre_item['pk']
                print '###########'   

                # From here this part of code skipped during updating the form  
            for genre_item in genres_data:
                try:
                    genre_instance = Genre.objects.get(id=genre['pk'])
                    print genre_instance 
                    Music.objects.create(track=track_instance,genre=genre_instance)
                except:
                    pass

                    #  to here
            track_instance.save()
            return Response(status=HTTP_200_OK)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
          



