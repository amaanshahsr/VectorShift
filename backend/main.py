import json
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List

app = FastAPI()

app.add_middleware(
     CORSMiddleware,
    allow_origins=["*"],

)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
        pipeline_data = json.loads(pipeline)
      
        graph={}      #  This graph will contain an adjacency list of the recieved pipeline  
        for edge in pipeline_data["edges"]:
         if edge['source'] not in graph:
            graph[edge['source']] = []
         graph[edge['source']].append(edge['target'])
        for node in pipeline_data["nodes"]:
            if node['id'] not in graph:
             graph[node['id']] = []

        
        def has_cycles(graph:Dict[str,List[str]])->bool:
            visited = {node: 0 for node in graph}  # 0 = not visited, 1 = visiting, 2 = visited | initialize all nodes to not visited
            
            def dfs(node:str)->bool:
                if(visited[node]==1):
                    return True
                if(visited[node]==2):
                    return False
                
                visited[node]=1
                for neighbour in graph[node]:
                    if(dfs(neighbour)):
                        return True
                visited[node]==2
                return False

            for node in graph:
                if visited[node]==0:
                    if(dfs(node)):
                        return True
            return False
        
        def is_directed_and_acyclic(graph: Dict[str, List[str]]) -> bool:
            if has_cycles(graph):
                return False
            return True
                    
        print(is_directed_and_acyclic(graph),graph)
                    
        return {"status": "success", "num_edges": len(pipeline_data["edges"]),"num_nodes":len(pipeline_data["nodes"]),"is_dag":is_directed_and_acyclic(graph)}
     
