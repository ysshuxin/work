import urllib.request
import re
import pymysql
from bs4 import BeautifulSoup
import time

db = pymysql.connect('localhost','root','yss8023313','yss')
cursor = db.cursor()
cursor.execute("select distinct url from url")
data=cursor.fetchall()
i=0
data=data[1796:-1]
for item in data:
    try:
        file=urllib.request.urlopen(item[0])
    except urllib.error.HTTPError as err:
        print(err)
        continue
    file=urllib.request.urlopen(item[0])
    data=file.read().decode('utf-8') 
    html = BeautifulSoup(data)
    try:
        price=html.find_all("div", class_="coinprice")[0].contents[0]
    except IndexError as err:
        print(err)
        price="-"
    try:
        tokenNumber=html.find_all("div", class_="tit",string="流通量")[0].find_next_sibling('div').contents[0]
    except IndexError as err:
        print(err)
        tokenNumber="-"
    try:
        tokenAllnumber=html.find_all("div", class_="tit",string="总发行量")[0].find_next_sibling('div').contents[0]
    except IndexError as err:
        print(err)
        tokenAllnumber="-"
    try:
        price24h=html.find_all("div", class_="tit",string="24H成交额")[0].find_next_sibling('div').contents[0]
    except IndexError as err:
        print(err)
        price24h="-"
    try:
        englishName=html.find_all("span", class_="tit",string="英文名：")[0].find_next_sibling('span').string
        englishName=englishName.replace("'", '"')
    except IndexError as err:
        print(err)
        englishName="-"
    try:
        chineseName=html.find_all("span", class_="tit",string="中文名：")[0].find_next_sibling('span').string
    except IndexError as err:
        print(err)
        chineseName="-"
    try:
        issueTime=html.find_all("span", class_="tit",string="发行时间：")[0].find_next_sibling('span').string
    except IndexError as err:
        print(err)
        issueTime="-"
    try:
        whiteBook=html.find_all("span", class_="tit",string="白皮书：")[0].find_next_sibling('span').find_all('a')[0].string
    except IndexError  as err:
        whiteBook="-"
        print(err)
    try:
         website= html.find_all("span", class_="tit",string="网站：")[0].find_next_sibling('span').find_all('a')[0]['href']
    except IndexError  as err:
        website="-"
        print(err)
    try:
         allPrice= html.find_all("div", class_="tit",string="流通市值")[0].find_next_sibling('div').contents[0]
    except IndexError  as err:
        allPrice="-"
        print(err)
    sql="INSERT INTO info VALUES("+"'"+ englishName+"'"+","+"'"+ chineseName+"'"+","+"'"+ price+"'"+","+"'"+ allPrice+"'"+","+"'"+ tokenNumber+"'"+","+"'"+ tokenAllnumber+"'"+","+"'"+ issueTime+"'"+","+"'"+ whiteBook+"'"+","+"'"+ website+"'"+","+"'"+ price24h+"')"
    print(sql)
    cursor.execute(sql)
