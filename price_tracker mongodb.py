from bs4 import BeautifulSoup
import time
import os
import urllib3
import openpyxl
import smtplib
import datetime
import pickle
import copy
import timeit
import re
import playsound
import pymongo
from pymongo import MongoClient
http = urllib3.PoolManager()
blacklist_file_name = 'C:\\Users\Shaun\PycharmProjects\PriceTracker\log.xlsx'
wb1 = openpyxl.load_workbook(blacklist_file_name)
sheet1 = wb1.active
flag = 0
blacklisted_items = []


def send_mail(product_name,dropped_price):
    server = smtplib.SMTP('smtp.gmail.com', 587)

    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login("shaunmisquitta@gmail.com","pbsqdsdpprkh")

    body=f'Hey! \n\n\n Name of Product:{product_name} \n\n  Dropped Price:{dropped_price}'
    msg=f'Subject:Price Dropped\n\n{body}'
    #server.sendmail("kitty.misquitta@gmail.com","shaunmisquitta75@gmail.com",msg)
    print("Mail Sent!")
    server.quit()

def display_price(title, item_price):
    print("---------Price Dropped----------")
    print(title)
    print("Lowest Price:", item_price)
    print("--------------------------------")
    print(" ")

def find_last_row():
    i = 1
    while (1):
        val = sheet1.cell(row=i, column=1).value
        if (val == None):
            last_row = i - 1
            break
        else:
            i = i + 1
    return last_row

def speak():
    for i in range(1, 3):
        playsound.playsound('C:\\Users\Shaun\PycharmProjects\PriceTracker\PriceDropped.mp3',True)
        time.sleep(3)


def check_price(url, price_threshold):

    responce = http.request('GET', url)
    soup = BeautifulSoup(responce.data, features="html5lib")
    try:
        time.sleep(0.3)
        item_price = soup.find(id='priceblock_ourprice')
        if (item_price == responce.data.price):
            item_price = soup.find(id='priceblock_dealprice')
            if (item_price == None):
                item_price = soup.find(id='priceblock_sale_price')
                if (item_price == None):
                    pass
                else:
                    item_price = soup.find(id='priceblock_sale_price').get_text()
            else:
                item_price = soup.find(id='priceblock_dealprice').get_text()
        else:
            pass
        item_price = str(item_price)
        time.sleep(0.5)


        if (item_price !='None'):
            title = soup.find(id='productTitle').get_text()

            title = title.strip()
            item['current_price'] = item_price

            item_price = item_price[2:-3]
            
            if (item_price < int(price_threshold)):
                print('Processed Item:', name_of_prod,'(Price Dropped)')
                #send_mail(title,item_price)
                if(item['dropped_price'] ==False):
                    speak()                 
            else:
                print('Processed Item:', name_of_prod)

    except AttributeError as e:
        print("Error has Occured. Please Check",e)


print("Starting")

if (price_tracker==true):
    #playsound.playsound('C:\\Users\Shaun\PycharmProjects\PriceTracker\startingcode.mp3', True)
    print("start time:", datetime.datetime.now())


    for user in results:
        user = user
        print(user)
        username = user['username']
        for item in user['tracking_data']:

            name_of_prod = item['name_of_prod']
            url= item['url']
            price_tresh = item['price_tresh']
            if (url == None):
                continue

            if (len(url) != 36):
                cleaned_link =clean_link(url)
                item['url'] = cleaned_link

            returnn = check_price(url, price_tresh)

            if (returnn == "robot check dectected"):
                print("Robot check Dectected")
                break
        with open('temp.pkl','rb') as file:
            original_user = pickle.load(file)

        for (item1, item2) in zip(original_user['tracking_data'], user['tracking_data']):
            if (item1['name_of_prod'] == item2['name_of_prod']  == item2['price_tresh'] and item1['current_price'] == item2['current_price'] and item1['dropped_price'] == item2['dropped_price']):
                    print(item1['dropped_price'], item2['dropped_price'])

            else:
                collection.delete_one({'username': username})
                time.sleep(4)
                collection.insert_one(user)

                break
        print("------------")
        print("------------")
    print(user)
    print("finished time", datetime.datetime.now())
    print("Done")
    time.sleep(30)
else:
    print("Night!")
