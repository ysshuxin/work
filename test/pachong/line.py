


    # -*- coding: utf-8 -*-
import sys
import os
import codecs

exts = ['.js','.css']
def read_line_count(fname):
    count = 0
    with open('code_line_count.txt','a') as f:
        f.write('fname:%s\n' % fname)
    with open(fname,'r',encoding='utf8') as f:
        for file_line in f.readlines():
            file_line = file_line.strip() 
            if not len(file_line) or file_line.startswith('//'):
                continue   
            count += 1
    with open('code_line_count.txt','a') as f:
        f.write('line count::%s\n' % count)
    return count

if __name__ == '__main__':
    with open('code_line_count.txt','w') as f:
        f.write('\n')
    count = 0
    fcount = 0
    for root,dirs,files in os.walk(os.getcwd()):
        for f in files:
            # Check the sub directorys
            print(f)
            fname = (root + '\\'+ f).lower()
            if os.path.splitext(f)[1]:
                ext = f[f.rindex('.'):]
                try:
                    if(exts.index(ext) >= 0):
                        fcount += 1
                        c = read_line_count(fname)
                        count += c
                        with open('code_line_count.txt','a') as f:
                            f.write('total count:%s\n' % count)
                except:
                    pass

    with open('code_line_count.txt','a') as f:
        f.write('\n')
        f.write('--------------------------------------\n')
        f.write('total file count:%d\n' % fcount)
        f.write('total line count:%d\n' % count)