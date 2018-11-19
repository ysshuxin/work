
# coding:utf-8
"""
Compatible for python2.x and python3.x
requirement: pip install requests
"""
from __future__ import print_function
import requests
# 请求示例 url 默认请求参数已经做URL编码
url = "https://api02.idataapi.cn/news/bbc?apikey=<您自己的apikey>&kw=obama"
headers = {
"Accept-Encoding": "gzip",
"Connection": "close"
}
if __name__ == "__main__":
r = requests.get(url, headers=headers)
json_obj = r.json()
print(json_obj) 