import urllib.request
import re
import pymysql
from bs4 import BeautifulSoup
db = pymysql.connect('localhost','root','yss8023313','yss')
cursor = db.cursor()

startUrl = "https://www.feixiaohao.com/"
pageurl=['https://www.feixiaohao.com/']
for i in range(25):
    if i==0:
        continue
    else:
     pageurl.append((startUrl+'list_'+str(i)+'.html')) 
print(pageurl)
i=0
for item in pageurl:
    file=urllib.request.urlopen(item)
    data=file.read().decode('utf-8') 
    pattern = re.compile(r'/currencies/\w*-*\w*')
    result1 = pattern.findall(data)
    def newurl(url):
        return 'https://www.feixiaohao.com'+url
    urllist=list(set(map(newurl,result1)))
    for item in urllist: 
      i=i+1
      sql="INSERT INTO url (url,id)VALUES("+"'"+ item+"'"+","+str(i)+")"
      cursor.execute(sql)
     
print(i)
       
