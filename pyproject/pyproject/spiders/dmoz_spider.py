import scrapy

class DmozSpider(scrapy.Spider):
    name = "dmoz"
    allowed_domains = ["biquyun.com"]
    start_urls = [
        "http://www.biquyun.com/xuanhuan/",
    ]

    def parse(self, response):
        print(response)
        filename = response.url.split("/")[-2] + '.html'
        with open(filename, 'wb') as f:
            f.write(response.body)