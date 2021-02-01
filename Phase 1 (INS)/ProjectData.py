class ProjectData:    
    """
    This class is used to store the project data of individual applications. In three level of hierarchies,
    Orange, Red and Blue.
    """  
    import sqlite3 
    global sqlite3    
    
    def __init__(self, application_id, project_title, category, skills_required,description):
        '''        
        Initializing the class Project Data
        
        Parameters
        ----------
        application_id : INT
            Application ID of individual Project.
        project_title : String
            Project Title for the Project.
        category : String, optional
            Category for the Project. The default is None.
        skills_required : String, optional
            Skills Required for the Project. The default is None.
        description : String, optional
            Description for the Project. The default is None.
        Returns
        -------
        None.
        '''
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
            
    
    def add_additional_details(self, git_link = None, doc_link = None, slack_link = None):
        '''
        Parameters
        ----------
        git_link : String, optional
            Git Hub Repository Link of Project. The default is None.
        doc_link : String, optional
            Docs Link of Project. The default is None.
        slack_link : String, optional
            Slack Link of Project. The default is None.
        Returns
        -------
        None.
        '''
        conn = sqlite3.connect('Data.db')
        try:
            conn.execute('''CREATE TABLE IF NOT EXISTS Additional
                         (Appn_ID INT NOT NULL,
                         GitLink TEXT NULL,
                         DocLink TEXT NULL,
                         SlackLink TEXT NULL,
                         PRIMARY KEY (Appn_ID)
                         );''')
            params = [self.application_id, git_link, doc_link, slack_link]             
            conn.execute("REPLACE INTO Additional Values(?,?,?,?)",params)
            
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
            
        
    
    def add_orange_sub_heading(self, orange_order, orange_title, description = None):
        '''
        Level 1: Hierarchial Level(Orange)
        Parameters
        ----------
        orange_order : INT
            Index of the tile.
        orange_title : String
            Title of tile.
        description : String, optional
            Description of tile. The default is None.
        Returns
        -------
        None.
        '''
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
        '''
        Level 2: Hierarchial Level(Red)
        Parameters
        ----------
        parent_order : INT
            Index of Orange(Level 1) Tile
        red_order : INT
            Index of Tile.
        red_title : String
            Title of tile.
        duration : INT, optional
            Duration of particular task in days. The default is None.
        skills_tags : String, optional
            Skills required for particular task. The default is None.
        description : String, optional
            Description of particular tile. The default is None.
        Returns
        -------
        None.
        '''
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
            
    
    def add_blue_subheading(self,grand_parent_order, parent_order, blue_order, blue_title, link_desc = None):
        '''
        Level 3: Hierarchial Level(Blue)
        Parameters
        ----------
        grand_parent_order : INT
            Index of Orange(Level 1) Tile.
        parent_order : INT
            Index of Red(Level 2) Tile.
        blue_order : INT
            Index of Tile.
        blue_title : String
            Title of tile.
        link_desc : String, optional
            Description or refeerence links. The default is None.
        Returns
        -------
        None.
        '''
        conn = sqlite3.connect('Data.db')
        try: 
            conn.execute('''CREATE TABLE IF NOT EXISTS Blue
                         (Appn_ID INT NOT NULL,
                         GPOParentOrder INT NOT NULL, 
                         RParentOrder INT NOT NULL,
                         TileOrder INT NOT NULL,
                         BlueTitle TEXT NOT NULL,
                         LinkDesc TEXT NULL,
                         PRIMARY KEY (Appn_ID,GPOParentOrder, RParentOrder, TileOrder)
                         );''')
            
   
            params = [self.application_id,grand_parent_order, parent_order, blue_order, blue_title, link_desc]             
            conn.execute("REPLACE INTO Blue Values(?,?,?,?,?,?)",params)
            
        except Exception as e:
            print(e)
        finally:
            conn.commit()   
            conn.close()
            

    def delete_orange(self,TileOrder):
        '''
        Delete the Orange(Level 1) tile.
        Parameters
        ----------
        TileOrder : INT
            Order of tile.
        Returns
        -------
        None.
        '''
        conn = sqlite3.connect('Data.db')
        try:
            conn.execute(f'''DELETE FROM Orange WHERE Appn_ID = {self.application_id} AND TileOrder = {TileOrder};''')
            conn.execute(f'''DELETE FROM Red WHERE Appn_ID = {self.application_id} AND OParentOrder = {TileOrder};''')
            conn.execute(f'''DELETE FROM Blue WHERE Appn_ID = {self.application_id} AND GPOParentOrder = {TileOrder};''')
        except Exception as e:
            print(e)
        finally:
            conn.commit()   
            conn.close()
            
        
    def delete_red(self, orangeOrder, redOrder):
        '''
        Delete the Red (Level 2) tile.
        Parameters
        ----------
        orangeOrder : INT
            Order of parent orange tile.
        redOrder : INT
            Order of Red Tile.
        Returns
        -------
        None.
        '''
        conn = sqlite3.connect('Data.db')
        try:
            conn.execute(f'''DELETE FROM Red WHERE Appn_ID = {self.application_id} AND OParentOrder = {orangeOrder} AND TileOrder = {redOrder};''')
            conn.execute(f'''DELETE FROM Blue WHERE Appn_ID = {self.application_id} AND GPOParentOrder = {orangeOrder} AND RParentOrder = {redOrder};''')
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
            
    
    def delete_blue(self, orangeOrder, redOrder, blueOrder):
        '''
        Delete the Blue (Level 3) tile.
        Parameters
        ----------
        orangeOrder : INT
            Order of grandparent orange tile.
        redOrder : INT
            Order of parent red tile.
        blueOrder : TYPE
            Order of blue tile.
        Returns
        -------
        None.
        '''
        conn = sqlite3.connect('Data.db')
        try:
            conn.execute(f'''DELETE FROM Blue WHERE Appn_ID = {self.application_id} AND GPOParentOrder = {orangeOrder} AND RParentOrder = {redOrder} AND TileOrder = {blueOrder};''')
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()

    
    def delete(self):
        conn = sqlite3.connect('Data.db')
        try:
            conn.execute(f'''DELETE FROM Project WHERE Appn_ID = {self.application_id};''')
            conn.execute(f'''DELETE FROM Additional WHERE Appn_ID = {self.application_id};''')
            conn.execute(f'''DELETE FROM Orange WHERE Appn_ID = {self.application_id};''')
            conn.execute(f'''DELETE FROM Red WHERE Appn_ID = {self.application_id};''')
            conn.execute(f'''DELETE FROM Blue WHERE Appn_ID = {self.application_id};''')
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
    
    member1 = ProjectData(1,"Member 1 ka project",category="Android",description='''Member 1 ke project ka description.''',skills_required="JAVA")
    member2 = ProjectData(2,"Member 2 ka project",category="Web",description='''Member 2 ke project ka description.''',skills_required="JAVA")                      
    member3 = ProjectData(3,"Member 3 ka project",category="OS",description='''Member 3 ke project ka description.''',skills_required="JAVA")                      
    
    
    member1.add_orange_sub_heading(1,"Stages Of Development",description="Stages Of Dev ka desc")
    member1.add_orange_sub_heading(2,"Planning",description="Planning ka desc")
    member1.add_orange_sub_heading(3,"Function & Feature",description="Function & Feature ka desc")
    
    member1.add_orange_sub_heading(2,"Planning Edited")
    
    
    member1.add_red_sub_heading(2,1,"Brainstorming",duration=2,skills_tags="GIT",description="Brainstorming ka desc")
    member1.add_red_sub_heading(2,2,"Technology Stack",duration=3,skills_tags="Java",description="TechStack ka desc")
    member1.add_red_sub_heading(2,3,"Job Distribution",duration=4,skills_tags="Python",description="JD ka desc")
    
    member1.add_red_sub_heading(2,1,"Brainstorming EDITED",duration=6,skills_tags="Java",description="Brain ka EDITED desc")
    
    member1.add_blue_subheading(2,1,1,"Foreign Implementations",link_desc="Ye hai link foreign ka")
    member1.add_blue_subheading(2,2,1,"Adobe XD",link_desc="Ye hai link Adobe ka")
    
    
    member1.add_additional_details("GITLINK","DOCLINK","SLACKLINK")
    
    
    member2.add_orange_sub_heading(1,"Member 2 ka Stages Of Development",description="Stages Of Dev ka desc")
    member2.add_orange_sub_heading(2,"Member 2 ka Planning",description="Planning ka desc")
    
    #del(member1)
    
    
    test = sqlite3.connect('Data.db')
    print(test.execute('Select * FROM Project').fetchall())
    test.commit()
    test.close()

