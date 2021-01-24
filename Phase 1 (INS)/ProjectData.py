class ProjectData:
    import sqlite3
    global sqlite3    
    
    def __init__(self, application_id, project_title, category=None, skills_required=None,description=None):
        self.application_id = application_id
        
        conn = sqlite3.connect('Data.db')
        
        try:  
            conn.execute('''CREATE TABLE IF NOT EXISTS Project 
                         (Appn_ID INT NOT NULL,
                         ProjectTitle TEXT NOT NULL,
                         Category TEXT NULL,
                         SkillsReq TEXT NULL,
                         Description TEXT NULL,
                         PRIMARY KEY (Appn_ID)
                         );''')
            params = [self.application_id, project_title, category, skills_required, description]             
            conn.execute("INSERT INTO Project Values(?,?,?,?,?)",params)
            
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
    
    
    
    
    def add_orange_sub_heading(self, orange_order, orange_title, description = None):
        conn = sqlite3.connect('Data.db')
        try:

            conn.execute('''CREATE TABLE IF NOT EXISTS Orange 
                         (Appn_ID INT NOT NULL,
                         TileOrder INT NOT NULL,
                         OrangeTitle TEXT NOT NULL,
                         Description TEXT NULL,
                         PRIMARY KEY (Appn_ID, TileOrder)
                         );''')
            
                
            params = [self.application_id, orange_order, orange_title, description]             
            conn.execute("REPLACE INTO Orange Values(?,?,?,?)",params)
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
    
            
    def add_red_sub_heading(self,parent_order, red_order, red_title, duration = None, skills_tags = None, description = None):
        conn = sqlite3.connect('Data.db')
        try:                
            conn.execute('''CREATE TABLE IF NOT EXISTS Red
                         (Appn_ID INT NOT NULL,
                         OParentOrder INT NOT NULL,
                         TileOrder INT NOT NULL,
                         RedTitle TEXT NOT NULL,
                         Duration INT NULL,
                         Skills Text NULL,
                         Description TEXT NULL,
                         PRIMARY KEY (Appn_ID, OParentOrder, TileOrder)
                         );''')
            
          
                
            params = [self.application_id, parent_order, red_order, red_title, duration, skills_tags, description]             
            conn.execute("REPLACE INTO Red Values(?,?,?,?,?,?,?)",params)
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
    
    def add_blue_subheading(self, parent_order, blue_order, blue_title, link_desc = None):
        conn = sqlite3.connect('Data.db')
        try: 
                conn.execute('''CREATE TABLE IF NOT EXISTS Blue
                             (Appn_ID INT NOT NULL,
                             RParentOrder INT NOT NULL,
                             TileOrder INT NOT NULL,
                             BlueTitle TEXT NOT NULL,
                             LinkDesc TEXT NULL,
                             PRIMARY KEY (Appn_ID, RParentOrder, TileOrder)
                             );''')
                
              
                    
                params = [self.application_id, parent_order, blue_order, blue_title, link_desc]             
                conn.execute("REPLACE INTO Blue Values(?,?,?,?,?)",params)
        except Exception as e:
            print(e)
        finally:
            conn.commit()   
            conn.close()
    

        
    
    def save(self):
        try:
            pass
        except:
            pass
    
        
    



#%% Testing Code

if __name__ == "__main__":
    member1 = ProjectData(1,"Member 1 ka project",category="Android",description='''Member 1 ke project ka description.''')
    member2 = ProjectData(2,"Member 2 ka project",category="Web",description='''Member 2 ke project ka description.''')                      
    member3 = ProjectData(3,"Member 3 ka project",category="OS",description='''Member 3 ke project ka description.''')                      
    
    
    member1.add_orange_sub_heading(1,"Stages Of Development",description="Stages Of Dev ka desc")
    member1.add_orange_sub_heading(2,"Planning",description="Planning ka desc")
    member1.add_orange_sub_heading(3,"Function & Feature",description="Function & Feature ka desc")
    
    member1.add_orange_sub_heading(2,"Planning Edited", description="Planning EDITED")
    
    
    member1.add_red_sub_heading(2,1,"Brainstorming",duration=2,skills_tags="GIT",description="Brainstorming ka desc")
    member1.add_red_sub_heading(2,2,"Technology Stack",duration=3,skills_tags="Java",description="TechStack ka desc")
    member1.add_red_sub_heading(2,3,"Job Distribution",duration=4,skills_tags="Python",description="JD ka desc")
    
    member1.add_red_sub_heading(2,1,"Brainstorming EDITED",duration=6,skills_tags="Java",description="Brain ka EDITED desc")
    
    member1.add_blue_subheading(1,1,"Foreign Implementations",link_desc="Ye hai link foreign ka")
    member1.add_blue_subheading(2,1,"Adobe XD",link_desc="Ye hai link Adobe ka")
    
    
    member2.add_orange_sub_heading(1,"Member 2 ka Stages Of Development",description="Stages Of Dev ka desc")
    member2.add_orange_sub_heading(2,"Member 2 ka Planning",description="Planning ka desc")
    
    
    test = sqlite3.connect('Data.db')
    test.execute('Select * FROM Orange').fetchall()
    test.commit()
    test.close()


