from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('category/<int:pk>/', views.category_detail, name="category_detail"),
    path('post/<int:pk>/', views.post_detail, name="post_detail"),
    path('post/create/', views.post_create, name="post_create"),
    path('post/<int:pk>/update/', views.post_update, name="post_update"),
    path('post/<int:pk>/delete/', views.post_delete, name="post_delete"),
    path('category/create/', views.category_create, name="category_create"),
    path('category/<int:pk>/update/', views.category_update, name="category_update"),
    path('category/<int:pk>/delete/', views.category_delete, name="category_delete"),
]
