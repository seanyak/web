from django.shortcuts import render
from markdown2 import Markdown
import random

from . import util


def md2html(title):
    content = util.get_entry(title)
    markdowner = Markdown()
    if content == None:
        return None
    else:
        return markdowner.convert(content)

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry(request, title):
    html_content = md2html(title)
    if html_content == None:
        return render(request, "encyclopedia/error.html", {
            "message": "Invalid entry. Entry does not exist."
        })
    else:
         return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": html_content
         })

def search(request):
    if request.method == "POST":
        search_entry = request.POST['q']
        html_content = md2html(search_entry)
        if html_content is not None:
            return render(request, "encyclopedia/entry.html", {
                "title": search_entry,
                "content": html_content
            })
        else:
            entries = util.list_entries()
            rec = []
            for entry in entries:
                if search_entry.lower() in entry.lower():
                    rec.append(entry)
            return render(request, "encyclopedia/search.html", {
                "recommendation": rec
            })

def newentry(request):
    if request.method == "GET":
        return render(request, "encyclopedia/new.html")
    else:
        title = request.POST['title']
        content = request.POST['content']
        exist = util.get_entry(title)
        if exist is not None:
            return render(request, "encyclopedia/error.html", {
                "message": "Invalid entry. Entry already exists."
            })
        else:
            util.save_entry(title, content)
            html_content = md2html(title)
            return render(request, "encyclopedia/entry.html", {
                "title": title,
                "content": html_content
            })

def edit(request):
    if request.method == "POST":
        title = request.POST['title']
        content = util.get_entry(title)
        return render(request, "encyclopedia/edit.html", {
            "title": title,
            "content": content
        })

def save_edit(request):
    if request.method == "POST":
        title = request.POST['title']
        content = request.POST['content']
        util.save_entry(title, content)
        html_content = md2html(title)
        return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": html_content
        })

def randomize(request):
    entries = util.list_entries()
    rand = random.choice(entries)
    html_content = md2html(rand)
    return render(request, "encyclopedia/entry.html", {
        "title": rand,
        "content": html_content
    })