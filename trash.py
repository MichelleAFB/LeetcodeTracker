import  xml.etree.ElementTree as ET


from exchange.writeAllTripDescriptions.parseTripDescriptions import __parse
from exchange.writeOneTripDescription.findTripsForTag import __findTripsForTag

filePath="C:\Users\michelle.badu\Documents\Studio 5000\Projects\ParseTags\EquipShutdowns.xml"
destination="[AutumnHills]Sandbox"
elements=__parse("C:\Users\michelle.badu\Documents\Studio 5000\Projects\ParseTags\EquipShutdowns.xml")
e=elements[0]
print("hi")
def __parse():
	print("\n\n\n\n")
	names=[]
	data=[]
	root=ET.parse("C:\Users\michelle.badu\Documents\Studio 5000\Projects\ParseTags\EquipShutdowns.xml")
	root=root.getroot()
	comment=None
	text=None
	for child in root:
		for a in child:
			for b in a:
				if(b.tag=="Program"):
						for c in b:
							if(c.tag=="Routines"):
								for d in c:
									 if(d.get("Name")!="MainRoutine"):		
										 names.append(d.get("Name"))
										 print("-------------"+d.get("Name")+"-----------")
										 for e in d:
											for f in e:
												 c=f.text
												 #print("----Rung "+f.get("Type")+"----")
												 print(g.findAll('Comments'))
												 print(g.findAll('Text'))
												 for g in f:
													 c=g.text
													 if(g.tag=="Comment"):
													 	 comment=g.text
													 if(g.tag=="Text"):
													 	 text=g.text
													 #print("----")
													 #print(g.tag)
													 #print(text)
													 #print(g.tag)
													 #print(comment)												 	 
													 for h in g:
														 print("text:"+text)
														 print("comment:"+comment)
														 str=g.text.replace(",","")
														 str=str.split(" ")
													
													 	 for s in str:
														 	 s=s.replace("-","_")
														 	 if s in names and s!=d.get("Name"):
															      print("---------"+d.get("Name")+"--------------------")
															#print("----Rung "+f.get("Type")+"----\n")
															#print("FOUND\n\n",s," is in ",d.get("Name"))