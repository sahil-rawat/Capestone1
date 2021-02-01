import sqlite3
global sqlite3

test = sqlite3.connect('/Users/sahilsinghrawat/Projects/Capestone/WMS/Phase 1 (INS)/Data.db')
project = test.execute('Select * FROM Project WHERE Appn_id==1').fetchall()
orange = test.execute('Select * FROM Orange WHERE Appn_id==1').fetchall()
red = test.execute('Select * FROM Red WHERE Appn_id==1').fetchall()
blue = test.execute('Select * FROM Blue WHERE Appn_id==1').fetchall()

test.commit()
test.close()
