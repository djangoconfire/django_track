
from rest_framework import serializers

from .models import Tracks,Genre


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracks
        fields = '__all__'



class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'



