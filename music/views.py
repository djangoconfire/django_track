from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
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
    RetrieveAPIView,
    RetrieveUpdateAPIView
    )

from .pagination import TrackLimitOffsetPagination, TrackPageNumberPagination
from serializers import TrackSerializer,GenreSerializer

class GenreApiView(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]

    def create(self,request,*args,**kwargs):
        print 'adding new genre'
        try:
            name = request.POST['genre_name']
            Genre.objects.create(name=name)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # def get_genre(self,request,*args,**kwargs):
    #     try:
    #         genre_dict={}
    #         genre_id = kwargs['genre_id']
    #         genre_instance = Genre.objects.get(id=genre_id)
    #         genre_dict['id'] = genre_instance.id
    #         genre_dict['name'] = genre_instance.name
    #         return Response({"results":genre_dict},status=status.HTTP_200_OK)
    #     except:
    #         return Response(status=status.HTTP_200_OK)


    # def update(self,request,*args,**kwargs):
    #     try:
    #         genre_id = request.POST['genre_id']
    #         genre_instance = Genre.objects.get(id=genre_id)
    #         genre_instance.name = request.POST['name']
    #         genre_instance.save()
    #         return Response(status=status.HTTP_200_OK)
    #     except:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)


class TrackApiView(ModelViewSet):
    queryset = Tracks.objects.all()
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

        return Response({"results":track_data},status=status.HTTP_200_OK)


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
            return Response(status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



    # def track_detail(self,request,*args,**kwargs):
    #     print 'inside track detail'
    #     try:
    #         track_id = kwargs['track_id']
    #         track_dict = {}
    #         track_obj = Tracks.objects.get(id=track_id)
    #         track_dict['name']= track_obj.title
    #         track_dict['rating']= track_obj.rating
    #         trackgenre_obj = Music.objects.filter(track=track_obj)
    #         genre_list = []
    #         for genres in trackgenre_obj:
    #             genre_dict = {}
    #             genre_dict['pk'] = genres.genre.id
    #             genre_dict['name'] = genres.genre.name
    #             genre_list.append(genre_dict)
    #         track_dict['genre']= genre_list

    #         return Response({"results":track_dict})
    #     except:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

    # def update(self,request,*args,**kwarsg):
    #     try:
    #         title = request.POST['track_title']
    #         rating = request.POST['rating']
    #         genres_list = request.POST['genre']
    #         track_id = request.POST['track_id']
    #         genres_list = json.loads(genres_list)
    #         track_obj = Tracks.objects.get(id=track_id)
    #         Music.objects.filter(track=track_obj).delete()
    #         track_obj.title = title
    #         track_obj.rating = rating

    #         for genres in genres_list:
    #             try:
    #                 genre_obj = Genre.objects.get(id=genres)
    #                 Music.objects.create(track=track_obj,genre=genre_obj)
    #             except:
    #                 pass
    #         track_obj.save()
    #         return Response(status=status.HTTP_200_OK)
    #     except:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
          



