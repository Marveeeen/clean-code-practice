# BAD NAMES

class Entity:
    def __init__(self, title, description, ymdhm):
        self.title = title
        self.description = description
        self.ymdhm = ymdhm

def output(item):
    print('Title: ', + item.title)
    print('Description: ' + item.description)
    print('Published: ' + item.ymdhm)

summary = 'Clean Code is Great!'
desc = 'Actually, writing Clean Code can be pretty fun. You\'ll see'
new_date = datetime.now()
publish = new_date.strftime('%Y-%m-%d %H:%M')

item = Entity(summary, desc, publish)

output(item)

# GOOD NAMES

class BlogPost:
    def __init__(self, title, description, date_published):
        self.title = title
        self.description = description
        self.date_published = date_published

def print_blog_post(blog_post):
    print('Title: ', + blog_post.title)
    print('Description: ' + blog_post.description)
    print('Published: ' + blog_post.date_published)

title = 'Clean Code is Great!'
description = 'Actually, writing Clean Code can be pretty fun. You\'ll see'
date_today = datetime.now()
formatted_date = date_today.strftime('%Y-%m-%d %H:%M')

blog_post = Entity(title, description, formatted_date)

print_blog_post(blog_post)
