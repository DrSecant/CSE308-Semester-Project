import random
import json 
from enum import Enum

class state(Enum):
  
	New_Jersey = 1
  
	Wisconsin = 2
  
	Virginia = 3




class Precinct:

  
	def __init__(self, ID, stateNum, population, neighbors, majority, boundaries):
    
		self.precinctID = ID
    
		self.stateNum = stateNum
    
		self.population = population
    
		self.neighbors = neighbors
    
		w = 0.52#random.uniform(0.2, 0.6)
    
		aa = 0.24#random.uniform(.15, 0.3)
    
		a = 0.13#random.uniform(0.1, 1 - w - aa)
    
		l = 0.11#1 - w - aa - a
    
		self.majority = {"African_American":aa, "Asian":a, "White":w, "Latin":l}
    
		self.boundaries = boundaries

  

	def toDict(self):
    
		return {"PrecinctID":self.precinctID, "State":self.stateNum, "Population":self.population, "Demographics":self.majority}

  
	
	def __repr__(self):
    
		res = "Precinct#: " + str(self.precinctID)
    
		res += "\nPopulation: " + str(self.population)
    
		return res + "\n"

class District:

  

	def calculatePop(self):
    
		pop = 0
    
		for p in self.containedPrecincts:
      
			pop += p.population
    
		return pop

  

	def __init__(self, districtID, precincts):
    
		self.districtID = districtID
    
		self.containedPrecincts = precincts
    
		self.population = self.calculatePop()

  

	def __repr__(self):
    
		res = "\nDistrictID: " + str(self.districtID) 
    
		res += "\nNumber of Contained Precincts: " + str(len(self.containedPrecincts))
    
		res += "\nPopulation: " + str(self.population)
   
		return res + "\n"

  

  

	def toDict(self):
    
		return {"District#":self.districtID, "Population":self.calculatePop(), "Precincts":[p.toDict() for p in self.containedPrecincts]}



class State:

  
	def __init__(self, numDistricts, districts, stateNum, mmDistricts, statePop, numPrecincts):
    
		self.numOfDistricts = numDistricts
    
		self.districts = districts 
    
		self.stateNum = stateNum
    
		self.mmDistricts = mmDistricts
    
		self.population = statePop
    
		self.numPrecincts = numPrecincts
    #majority-minority districts 

  
	
	def createPrecincts(self):
    
		precincts = []
    
		for i in range(self.numPrecincts):
      
			a = self.population / self.numPrecincts
      
			pop = random.randint(int(a * .8), int(a * 1.2))
      
			precincts.append(Precinct(i+1, self.stateNum, pop, None, None, None))
    
		self.precincts = precincts 

  

	def createDistricts(self, numDistricts):
    
		districts = []
    
		for i in range(numDistricts):
      
			pPerD = int(self.numPrecincts / numDistricts)
      
      
			if i == numDistricts - 1:
        
				districts.append(District(i+1, self.precincts[pPerD * i:]))
      
			else:
        
				districts.append(District(i+1, self.precincts[pPerD * i:pPerD*(i+1)]))
    
		self.districts = districts

  


	def printPrecincts(self):
    
		for precinct in self.precincts:
      
			print(precinct)

  def toDict(self):
    
		return {"State":int(self.stateNum), "Population":self.population, "Districts":[d.toDict() for d in self.districts], "Precincts":[p.toDict() for p in self.precincts]}




	def main():
  
		New_Jersey = State(12, None, 1, None, 9000000, 6346)
  
		New_Jersey.createPrecincts()
    New_Jersey.createDistricts(12)
  
		NJ = New_Jersey.toDict()
  
  
		Wisconsin = State(12, None, 2, None, 5975000, 3676)
 
		Wisconsin.createPrecincts()
  
		Wisconsin.createDistricts(8)
  
		WI = Wisconsin.toDict()
  
  
		Virginia = State(12, None, 3, None, 8470000, 2567)
  
		Virginia.createPrecincts()
  
		Virginia.createDistricts(11)
  
		VA = Virginia.toDict()

  
		states = {"New_Jersey":NJ, "Wisconsin":WI, "Virginia":VA}
  
		temp = open("temp.txt", "w+")
    temp.write(json.dumps(states))
    #json.dump(states, temp)
		temp.close()

    # the file is opened
    with open("temp.txt") as temp2
      demoData = json.load(temp2)

    for nj in demoData["New_Jersey"]
      for dist in nj["Districts"]
          precincts = []
        for pre in dist["Precincts"]
          datPrecinct = Precinct(pre["PrecinctID"], pre["State"], pre["Population"], None, pre["Demographics"], None)
          datPrecinct.toDict()
          precincts.append(datPrecinct)
        datDistrict = District(dist["District#"], precincts)
        datDistrict.toDict()

    for va in demoData["Virginia"]
      for dist in va["Districts"]
          precincts = []
        for pre in dist["Precincts"]
          datPrecinct = Precinct(pre["PrecinctID"], pre["State"], pre["Population"], None, pre["Demographics"], None)
          datPrecinct.toDict()
          precincts.append(datPrecinct)
        datDistrict = District(dist["District#"], precincts)
        datDistrict.toDict()

    for wi in demoData["Wisconsin"]
      for dist in wi["Districts"]
          precincts = []
        for pre in dist["Precincts"]
          datPrecinct = Precinct(pre["PrecinctID"], pre["State"], pre["Population"], None, pre["Demographics"], None)
          datPrecinct.toDict()
          precincts.append(datPrecinct)
        datDistrict = District(dist["District#"], precincts)
        datDistrict.toDict()



      main()
