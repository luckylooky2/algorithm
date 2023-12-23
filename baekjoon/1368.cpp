#include <iostream>
#include <vector>
#include <algorithm>
 
using namespace std;
 
int n;
 
int mat[301][301];
int parents[301];
vector<pair<int, pair<int, int> > > edges;
 
 
bool cmp(pair<int, pair<int, int> > a,  pair<int, pair<int, int> > b){
    return a.first < b.first;
}
 
 
int get_parent(int a){
    if(parents[a] == a) return a;
    return parents[a] = get_parent(parents[a]);
}
 
 
void union_parents(int a, int b){
    a = get_parent(a);
    b = get_parent(b);
    
    if(a > b) parents[a] = b;
    else parents[b] = a;
}
 
 
void solution(){
    
    sort(edges.begin(), edges.end(), cmp);
    for(int i=0; i<=n; i++) parents[i] = i;
    
    int sum = 0;
    for(int i=0; i<edges.size(); i++){
        int node1 = edges[i].second.first;
        int node2 = edges[i].second.second;
        int cost = edges[i].first;
        
        if(get_parent(node1) != get_parent(node2)){
            union_parents(node1, node2);
            sum += cost;
        }
    }
    
    cout << sum << endl;
}
 
 
int main(void){
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    
    cin >> n;
    
    int cost;
    for(int i=1; i<=n; i++){
        cin >> cost;
        edges.push_back({cost, {0, i}});
    }
        
    for(int i=1; i<=n; i++){
        for(int j=1; j<=n; j++){
            cin >> mat[i][j];
        }
    }
    
    for(int i=1; i<=n; i++){
        for(int j=i+1; j<=n; j++){
            edges.push_back({mat[i][j], {i, j}});
        }
    }
    
    solution();
}