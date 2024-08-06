import pandas as pd
import warnings

def getProcessTypeId(path):
    id=None
    if"PRETZEL" in path.upper():
        id=1
    elif "POPCORN" in path.upper():
        id=2
    elif "SUNCHIP" in path.upper() or "SUN CHIP" in path.upper():
        id=3
    elif "BC" in path.upper():
        id=4    
    elif  "TPC KETTLE" in path.upper() or "KETTLE" in path.upper():
        id=5
    elif " PC " in path.upper() or "_PC" in path.upper():
        id=7
    else:
        id=19
    return id

  


def getFormTypeId(path):
    name=path.replace('-','')
    name=name.upper()
    id=None
    if"START-UP" in path.upper():
        id=1
    elif "SHIFT-CHANGE" in path.upper():
        id=2
    elif "ALLERGEN" in path.upper():
        id=3  
   
       
    else:
        id=4
    return id
   

def fxn():
    warnings.warn("deprecated", DeprecationWarning)

def categorize_by_indicators1(sheet_data,path,allQuestions):
    # Cleaning data: drop all rows that are completely NaN
    print("\n\n\n\n\n")
    sections=[]
    processed_sections=[]
    sheet_data_clean = sheet_data.dropna(how='all')
    categorized_data = []
    start=False
    current_section = None
    current_category = None
    i=0
    allSectionsString=""
    questions=""
    pId=getProcessTypeId(path)
    fId=getFormTypeId(path)
    with open('text.text', 'a') as file:
        file.write('\n\n\nFILE:'+path+"\n process:"+str(pId)+",type:"+str(fId))
    print(fId)
    i=0
    warnings.filterwarnings("ignore")
    with warnings.catch_warnings(action="ignore"):
        fxn()
        
        for index, row in sheet_data_clean.iterrows():
            
            # Identify new sections (non-empty first column and empty second column)
            #print(row)
          
            all=sheet_data_clean
            index=i+1
            next=all.loc[index][0]
            print("NEXT:",next)
            if pd.notna(row[0]) and pd.isna(row[1]):
            
                current_section = row[0]
                
            
                
            # Identify categories and corresponding questions
            if "Auditor's Signature:" in next:
                print("\n\nFOUND NEXT",next)   
                nextIndex= index+1  
                print(type(all)) 
                print("\n\nFOUND NEXT",next) 
                next=all.iloc[nextIndex][0] 
                print("\n\nFOUND NEXT",next)
                start=True
                i=i+1
                if "GENERAL" in next:
                   # if pd.notna(row[0]) and current_section:
                    
                 
                        
                                        
                    print("\n\nFOUND",next)
                    start=True
                    i=i+1
                    if "I certify that the above line is food safe. " in current_section:
                        start=False
                    if "Go" in row.values:
                        current_category = "Go"

                    elif "No-Go" in row.values:
                        current_category = "No-Go"
                    elif "Work Request Number" in row.values:
                        current_category = "Work Request Number"
                    else:
                        if current_section not in processed_sections and start==True and i>=1:
                            i=i+1
                            if(i>2):
                            # questions=""
                            

                                processed_sections.append(current_section)
                                with open('text.text', 'a') as file:
                                    allSectionsString=allSectionsString+"("+str(len(processed_sections)-1)+",'"+current_section+"')"
                                    file.write('\nSECTION:'+current_section+", SORT_ORDER:"+str(len(processed_sections)-1))
                                sections.append({'section':current_section,'questions':[],'questionString':""})
                    
                    try:
                            questionSortOrder = row[0]
                            question=row[1]
                        

                            if type(questionSortOrder)==int and  int(row[0])>0:
                                questionSortOrder = row[0]
                                question=row[1]
                                
                                for section in sections:
                                    
                                    if(section['section']==current_section):
                                        questions=questions+"("+str(questionSortOrder)+",'"+question+"'),\n"
                                        section['questionsString']=questions
                                        #section['questions'].append({'sort_order':str(questionSortOrder),'question':question})
                                        ii=i+1
                                        all=sheet_data_clean
                                        if index+1<len(all):
                                            
                                            try:
                                                next=all.loc[index+1][0]
                                        
                                                if (next!=None and type(next)==str) or type(int(next))!=int:
                                                
                                                
                                                    try:
                                                        with open('text.text', 'a') as file:
                                                            file.write('\nQUESTIONS:"'+questions)
                                                            
                                                        questions=""
                                                    except Exception as e:
                                                        print(e)
                                            except Exception as e:
                                                    print("ERR",e)
                                            finally:
                                                print("---")   
                                        
                                    
                                
                            
             
                    finally:
                        ii=0
                        #print("\nquestions:",questions)
                        #continue
                                
                    if current_category:
                    
                        categorized_data.append({
                            'Section': current_section,
                            'Category': current_category,
                            'Question': question
                        })
                        current_category = None
            i=i+1
    with open('text.text', 'a') as file:
        file.write('\n\nSECTIONS:'+allSectionsString)
    if pId!=None and  pId!=8:
        return {'process':pId,'fId':fId,'questions':sections}

# Parse Sheet1
def categorize_by_indicators(sheet_data,path,allQuestions):
    # Cleaning data: drop all rows that are completely NaN
    sections=[]
    processed_sections=[]
    sheet_data_clean = sheet_data.dropna(how='all')
    categorized_data = []
    start=False
    current_section = None
    current_category = None
    i=0
    allSectionsString=""
    questions=""
    pId=getProcessTypeId(path)
    fId=getFormTypeId(path)
    with open('text.text', 'a') as file:
        file.write('\n\n\nFILE:'+path+"\n process:"+str(pId)+",type:"+str(fId))
    print(fId)
    i=0
    if fId!=4:
        with warnings.catch_warnings():
            
            for index, row in sheet_data_clean.iterrows():
            
                # Identify new sections (non-empty first column and empty second column)
                
                if pd.notna(row[0]) and pd.isna(row[1]):
                    current_section = row[0]
                    
                
                    
                # Identify categories and corresponding questions
                if pd.notna(row[0]) and current_section:
                    
                    if "If any of these exist do not start up . Contact your Coordinator" in current_section:
                        start=True
                        i=i+1
                    if "I certify that the above line is food safe. " in current_section:
                        start=False
                    if "Go" in row.values:
                        current_category = "Go"

                    elif "No-Go" in row.values:
                        current_category = "No-Go"
                    elif "Work Request Number" in row.values:
                        current_category = "Work Request Number"
                    else:
                        if current_section not in processed_sections and start==True and i>=1:
                            i=i+1
                            if(i>2):
                            # questions=""
                            

                                processed_sections.append(current_section)
                                with open('text.text', 'a') as file:
                                    allSectionsString=allSectionsString+"("+str(len(processed_sections)-1)+",'"+current_section+"'),"
                                    file.write('\nSECTION:'+current_section+", SORT_ORDER:"+str(len(processed_sections)-1))
                                sections.append({'section':current_section,'questions':[],'questionString':""})
                    
                        try:
                            questionSortOrder = row[0]
                            question=row[1]
                        

                            if type(questionSortOrder)==int and  int(row[0])>0:
                                questionSortOrder = row[0]
                                question=row[1]
                                
                                for section in sections:
                                    
                                    if(section['section']==current_section):
                                        questions=questions+"("+str(questionSortOrder)+",'"+question+"'),\n"
                                        section['questionsString']=questions
                                        #section['questions'].append({'sort_order':str(questionSortOrder),'question':question})
                                        ii=i+1
                                        all=sheet_data_clean
                                        if index+1<len(all):
                                            
                                            try:
                                                next=all.loc[index+1][0]
                                        
                                                if (next!=None and type(next)==str) or type(int(next))!=int:
                                                
                                                
                                                    try:
                                                        with open('text.text', 'a') as file:
                                                            file.write('\nQUESTIONS:"'+questions)
                                                            
                                                        questions=""
                                                    except Exception as e:
                                                        print(e)
                                            except Exception as e:
                                                    print("ERR",e)
                                            finally:
                                                print("---")   
                                        
                                    
                                
                            

                        finally:
                            ii=0
                            #print("\nquestions:",questions)
                            #continue
                                    
                        if current_category:
                        
                            categorized_data.append({
                                'Section': current_section,
                                'Category': current_category,
                                'Question': question
                            })
                            current_category = None
                i=i+1
        with open('text.text', 'a') as file:
            file.write('\n\nSECTIONS:'+allSectionsString)
        if pId!=None and  pId!=8:
            return {'process':pId,'fId':fId,'questions':sections}

sheets1=[
     'P-LAB.PCD.200.F021.REV.00 Cook Area Start-Up PSM .xlsx',
  'P-LAB.PCD.200.F022.REV.00 Corn Line Wash-Fryer Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F023.REV.00 Corn Line HOBART.xlsx',
  'P-LAB.PCD.200.F024.REV.00 Popper Creators FP 80 Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F025.REV.01 Popper Creators FT 200 Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F026.REV.00 A.E.I. Random Extruder Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F027.REV.00 Fry Lab Only Start-Up PSM .xlsx',
  'P-LAB.PCD.200.F028.REV.00 Fry Lab Only Start-Up PSM .xlsx',
  'P-LAB.PCD.200.F029.REV.00 A.R.E.X. Random Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F030.REV.01 Extruder #1 Start - UP PSM.xlsx',
  'P-LAB.PCD.200.F031.REV.01 Extruder #2 Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F032.REV.00 Ideal Popper Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F033.REV.00 PC Line Start-Up PSM.xlsx',
  'P-Lab.PCD.200.F035.REV.00 Funyun Extruder Start-Up PSM  .xlsx',
  'P-LAB.PCD.200.F036.REV.00 Miscellaneous Start-up PSM.xlsx',
  'P-LAB.PCD.200.F037.REV.00 Random Extruder Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F038.REV.01 Pertech Popper #2 Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F041.REV.00 Sun Chip Start-up PSM .xlsx',
  'P-LAB.PCD.200.F043.REV.00 TFT Start-Up PSM.xlsx',
  'P-LAB.PCD.200.F044.REV.01 FCC Start-Up PSM .xlsx',
  'P-LAB.PCD.200.F045.REV.00 Alice Start-up PSM.xlsx',
  'P-LAB.PCD.200.F046.REV.00 Cold bar Line PSM.xlsx',
  'P-LAB.PCD.200.F047.REV.00 FCC Start-up + HOBART PSM .xlsx',
  'P-LAB.PCD.200.F048.REV.00 Coppe Run Extruder Start-up PSM.xlsx',
  'P-LAB.PCD.200.F102.REV.00 Miscellaneous # 2 Start-up PSM 02 07 2024.xlsx',
  'P-LAB.PCD.200.F150.REV.00  2402 Retort Start up  PSM.xlsx',
  'P-LAB.PCD.200.F021.REV.00 Cook Area Start-Up PSM .xlsx',
  'P-LAB.PCD.200.F029.REV.00 A.R.E.X. Random Start-Up PSM.xlsx'


]
sheets=[
      'TPC22000.821.F001 TPC Potato Bin Room PSM.xlsx',
  'TPC22000.821.F002 TPC PC Line Start-up PSM.xlsx',
  'TPC22000.821.F002_PC.xlsx',
  'TPC22000.821.F003 TPC Kettle Line Start-up PSM.xlsx',
  'TPC22000.821.F004 TPC Corn Cook Area Start-up PSM.xlsx',
  'TPC22000.821.F005 TPC TC (Wash to Packaging) Start-up PSM.xlsx',
  'TPC22000.821.F006  Extruded-Sunchip Line Start-Up PSM.xlsx',
  'TPC22000.821.F007 Flo-Mech Start-up PSM.xlsx',
  'TPC22000.821.F008 Pretzel Start-up PSM.xlsx',
  'TPC22000.821.F009 BC72 Start-up PSM.xlsx',
  'TPC22000.821.F010 TPC Schaaf Extruder Start-up PSM.xlsx',
  'TPC22000.821.F011 TPC Packaging Start- up PSM.xlsx',
  'TPC22000.821.F012 TPC Baked Line (RBS) Start-up PSM.xlsx',
  'TPC22000.821.F013 Popcorn Start-up PSM.xlsx',
  'TPC22000.821.F020 Miscellaneous Start-Up PSM.xlsx',
  'TPC22000.821.F025 Kettle Line Shift Change PSM.xlsx',
  'TPC22000.821.F026 TPC TC (Wash to Packaging) Line Shift Change PSM.xlsx',
  'TPC22000.821.F027 Extruded-Sunchip Line Shift Change PSM.xlsx',
  'TPC22000.821.F028 Schaaf SSE Extruder Shift Change PSM.xlsx',
  'TPC22000.821.F029 Pretzel Shift Change PSM.xlsx',
  'TPC22000.821.F030 Miscellaneous_Shift Change PSM.xlsx',
  'TPC22000.821.F031 BC72 Shift Change PSM.xlsx',
  'TPC22000.821.F032 Bake Line Shift Change (RBS) PSM.xlsx',
  'TPC22000.821.F033 TPC Packaging Shift Change PSM.xlsx',
  'TPC22000.821.F034 Flo-Mech-up PSM Shift Change PSM.xlsx',
  'TPC22000.821.F035 Popcorn Shift Change  PSM.xlsx',
  'TPC22000.821.F036 PC Line Shift Change PSM.xlsx',
  'TPC22000.821.F051 BC-72  Line Allergen Change Over PSM Audit.xlsx',
  'TPC22000.821.F052 Pretzel Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F053 TC Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F054 Kettle Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F055 Extruded-Sunchip Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F056 TPC Packaging Allergen Change Over PSM.xlsx',
  'TPC22000.821.F057 RBS Baked Line  Allergen Change Over  PSM.xlsx',
  'TPC22000.821.F058 PC Line Allergen Change Over PSM Audit.xlsx',
  'TPC22000.821.F059 Schaaf Extruder Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F060 Flo-Mech-up Line Allergen Change Over PSM.xlsx',
  'TPC22000.821.F061 Miscellaneous Allergen Change Over PSM.xlsx',
  'TPC22000.821.F002 TPC PC Line Start-up PSM.xlsx',
  'TPC22000.821.F027 Extruded-Sunchip Line Shift Change PSM.xlsx'
]

i=0
rnd=False
if rnd==True:
    for sheet in sheets1:
        if i==1:
            questions=[]
            s="C:\\Users\\michelle.badu\\Documents\\PepsicoRND\\"+sheet
            sheet1_data = pd.read_excel(s)
        
            sheet1_parsed = categorize_by_indicators1(sheet1_data,s,questions)
            
            print(sheet1_parsed)
        i=i+1
else:
    for sheet in sheets:
        if i>-1:
            questions=[]
            s="C:\\Users\\michelle.badu\\Documents\\Pepsico\\"+sheet
            sheet1_data = pd.read_excel(s)
        
            sheet1_parsed = categorize_by_indicators(sheet1_data,s,questions)
            
            print(sheet1_parsed)
        i=i+1


