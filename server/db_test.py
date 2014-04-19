
from config import *
from models.database_access import *
from models.models import *

print ("Direct query for all maps in database:\n")
#database has values already filled in. You can query for a map object, and then pull out its items list by using the following

#------------------ADD ITEMS TO DB----------------------------------------
i = Items(57,298,27,51,'Player') #ID WILL BE 1
db.session.add(i)
i = Items(10,337,28,11,'Carrot') #ID WILL BE 2
db.session.add(i)
i = Items(2,299,44,34,'Tunnel') #ID WILL BE 3
db.session.add(i)

#-----------------ADD MAP1 to DB------------------------------------------
m = Maps(13,20,'static/maps/map1.txt')
db.session.add(m)
mi = MapItems(1,1,2,2)
db.session.add(mi)
mi = MapItems(1,2,5,6)
db.session.add(mi)
mi = MapItems(1,3,17,10)
db.session.add(mi)

U = User("SkyBear", "my_token", "my_secret", 5)
db.session.add(U)


db.session.add(mi)
db.session.commit()

DAC = database_access()

result = DAC.get_user("SkyBear").level
print ("Highest Level: " + str(result))



#getting the map with id 1
#m = db.session.query(Maps).get(1)

#automatically does the join on the map_items table to pull together the result
#item_list = m.items

print ("**********************************\n")

print ("Single map Query through database access: \n")
print (DAC.get_map_with_items(1))
