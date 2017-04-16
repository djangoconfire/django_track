from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from models import Tracks,Genre,Music
import json
from serializers import TrackSerializer,GenreSerializer

class TracksViewApi(generics.ListCreateAPIView):
    """ViewSet for the Tracks class"""

    queryset = Tracks.objects.all()
    serializer_class =TrackSerializer
    permission_classes = [permissions.AllowAny]



   

    # def create_new_track(self,request,*args,**kwargs):
    # 	print 'inside creation'
    # 	try:
    # 		title= request.POST['track_title']
    # 		rating = request.POST['rating']
    # 		genre_list = request.POST.get('genre')
    # 		genre_list = json.loads(genre_list)
    # 		print genre_list

    # 		track_instance= Tracks.objects.create(title=title,rating=rating)
    # 		for genre_id in genre_list:
    # 			try:
    # 				genre_obj = Genre.objects.get(id=genre_id)
    # 				Music.objects.create(track=track_instance,genre=genre_instance)
    # 			except:
    # 				pass
    # 		return Response({"message":"Track created"},status=status.HTTP_200_OK)

    # 	except:
    # 		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)


    # def list(self,request,*args,**kwargs):
    # 	try:
    # 		track_dict = {}
    # 		track_obj = Tracks.objects.get(id=2)
    # 		track_dict['title']= track_obj.title
    # 		track_dict['rating']= track_obj.rating
    # 		music_obj = Music.objects.filter(track=track_obj)
    # 		genre_list = []
    # 		for genres in music_obj:
    # 			genre_dict = {}
    # 			genre_dict['name'] = genres.genre.name
    # 			genre_list.append(genre_dict)
    # 		track_dict['genre']= genre_list

    # 		return Response({"message":"Success","track_detail":track_dict})
    # 	except:
    # 		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)

    # def update(self,request,*args,**kwarsg):
    # 	try:
    # 		# import pdb;pdb.set_trace()
    # 		title = request.POST['title']
    # 		rating = request.POST['rating']
    # 		genres_list = request.POST['genre']
    # 		track_id = request.POST['track_id']
    # 		genres_list = json.loads(genres_list)
    # 		track_obj = Tracks.objects.get(id=track_id)
    # 		Music.objects.filter(track=track_obj).delete()
    # 		track_obj.title = title
    # 		track_obj.rating = rating

    # 		for genres in genres_list:
    # 			try:
    # 				genre_obj = Genre.objects.get(id=genres)
    # 				Music.objects.create(track=track_obj,genre=genre_obj)
    # 			except:
    # 				pass
    # 		track_obj.save()
    # 		return Response({"message":"Success"},status=status.HTTP_200_OK)
    # 	except:
    # 		return Response({"message":"Failure"},status=status.HTTP_400_BAD_REQUEST)




class GenreViewApi(generics.ListCreateAPIView):
    """ViewSet for the Genre class"""

    queryset = Genre.objects.all()
    serializer_class =GenreSerializer
    permission_classes = [permissions.AllowAny]

    # def create(self,request,*args,**kwargs):
    # 	try:
    # 		# import pdb;pdb.set_trace()
    # 		name = request.POST['genre']
    # 		Genre.objects.create(name=name)
    # 		return Response({"message":"Genre created"},status=status.HTTP_200_OK)
    # 	except:
    # 		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)

    # def retrieve(self,request,*args,**kwargs):
    # 	try:
    # 		genre_id = kwargs['genre_id']
    # 		genre_obj = Genre.objects.get(id=genre_id)
    # 		genre_dict = {}
    # 		genre_dict['id'] = genre_obj.id
    # 		genre_dict['name'] = genre_obj.name
    # 		return Response({"message":"Genre retrieve","genre_detail":genre_dict},status=status.HTTP_200_OK)
    # 	except:
    # 		return Response({"message":"Invalid genre"},status=status.HTTP_200_OK)


    # def update(self,request,*args,**kwargs):
    # 	try:
    # 		genre_id = request.POST['genre_id']
    # 		genre_obj = Genre.objects.get(id=genre_id)
    # 		genre_obj.name = request.POST['name']
    # 		genre_obj.save()
    # 		return Response({"message":"Genre updated successfully"},status=status.HTTP_200_OK)
    # 	except:
    # 		return Response({"message":"Invalid request"},status=status.HTTP_400_BAD_REQUEST)

