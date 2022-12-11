from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from .models import Order


class OrderSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ('user')
        #addProduct Quantity