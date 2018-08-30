from django.db import models

'''
Bookshelf书架:
分类shelf_type
书架号shelf_id
BookInfo书信息:
名称bname
添加日期btime
分类btype
'''

# 继承models.Model才能作为模型取用

class Bookshelf(models.Model):  # 表
    # 字段类型:
    # CharField(String)
    # IntegerField(int)
    # DateTimeField(Time)
    # BooleanField(Boolean)
    # ForeignKey(外键)

    # id不用写, 自动添加的
    shelf_type = models.CharField(max_length=10)
    shelf_id = models.IntegerField()

    def __str__(self):
        return self.shelf_type
class BookInfo(models.Model):
    bname = models.CharField(max_length=20)
    btime = models.DateTimeField()
    btype = models.ForeignKey(Bookshelf, on_delete=models.CASCADE)
    def __str__(self):
        return self.hname