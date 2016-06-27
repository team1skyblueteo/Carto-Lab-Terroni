#!/usr/bin/python
print "Content-type: text/html"
print
#print "<pre>"
import cgitb
import cgi
from osgeo import gdal,ogr
import struct
cgitb.enable()

form = cgi.FieldStorage()
mx = float(form.getvalue('lon'))
my = float(form.getvalue('lat'))
rast='/var/www/html/CartoLabFS16/Carto-Lab-Terroni/Map/Data/wellington5m.tif' #../

#open raster layer
src_ds=gdal.Open(rast) 
gt=src_ds.GetGeoTransform()
#print gt
rb=src_ds.GetRasterBand(1)
#bandtype = gdal.GetDataTypeName(rb.DataType)
#print bandtype
gdal.UseExceptions() #so it doesn't print to screen everytime point is outside grid
#coordinates of desired pt

#to pixel
px = int((mx - gt[0]) / gt[1]) #x pixel
py = int((my - gt[3]) / gt[5]) #y pixel
#print px,py
try: #in case raster isnt full extent
    structval=rb.ReadRaster(px,py,1,1,buf_type=gdal.GDT_Float32) #Assumes 32 bit int- 'float'
    intval = struct.unpack('f' , structval) #assume float
    val=intval[0]
except:
    val=-9998 #or some value to indicate a fail

src_ds=None
ds=None
#print val


#174.855212,-41.18947
print(val)                    
#print "</pre>"
