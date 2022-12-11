# from dataclasses import fields
from rest_framework import serializers
from .models import Category
# from ecom.api.category import models

class CategorySerializes(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description')

