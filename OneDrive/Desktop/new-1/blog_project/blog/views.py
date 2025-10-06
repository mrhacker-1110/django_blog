from django.shortcuts import render, redirect, get_object_or_404
from .models import Category, Post
from .forms import PostForm, CategoryForm

def index(request):
    categories = Category.objects.all()
    posts = Post.objects.all()
    return render(request, "blog/index.html", {"categories": categories, "posts": posts})

def category_detail(request, pk):
    category = get_object_or_404(Category, pk=pk)
    return render(request, "blog/category_detail.html", {"category": category})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, "blog/post_detail.html", {"post": post})

def post_create(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("index")
    else:
        form = PostForm()
    return render(request, "blog/form.html", {"form": form, "title": "Создать пост"})

def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect("post_detail", pk=pk)
    else:
        form = PostForm(instance=post)
    return render(request, "blog/form.html", {"form": form, "title": "Редактировать пост"})

def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        post.delete()
        return redirect("index")
    return render(request, "blog/confirm_delete.html", {"object": post})

def category_create(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("index")
    else:
        form = CategoryForm()
    return render(request, "blog/form.html", {"form": form, "title": "Создать категорию"})

def category_update(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == "POST":
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            form.save()
            return redirect("category_detail", pk=pk)
    else:
        form = CategoryForm(instance=category)
    return render(request, "blog/form.html", {"form": form, "title": "Редактировать категорию"})

def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == "POST":
        category.delete()
        return redirect("index")
    return render(request, "blog/confirm_delete.html", {"object": category})
