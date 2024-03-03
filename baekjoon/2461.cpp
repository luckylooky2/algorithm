// 대표 선수 : 투 포인터, 정렬
#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>

using namespace std;

int main(void) {
	int n, m;
	vector<vector<int> > classes;
	vector<int> indexes;
	int			answer = 0x7f7f7f7f;

    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> n >> m;

    for (int i = 0; i < n; i++) {
		vector<int>	classVec;
		int			tmp;
        indexes.push_back(0);
        for (int j = 0; j < m; j++) {
			cin >> tmp;
			classVec.push_back(tmp);
		}
		classes.push_back(classVec);
    }
    
    for (int i = 0; i < n; i++) {
		sort(classes[i].begin(), classes[i].end());
	}

    while (true) {
        int minIndex;
        int max = -1;
        int min = 0x7f7f7f7f;
        
        for (int i = 0;i < n;i++) {
            if (min > classes[i][indexes[i]]) {
                min = classes[i][indexes[i]];
                minIndex = i;
            }
            if (max < classes[i][indexes[i]]) {
				max = classes[i][indexes[i]];
			}
        }
		if (answer > max - min) {
        	answer = max - min;
		}
        indexes[minIndex] += 1;
        if (indexes[minIndex] == m) {
			break;
		}
    }
    cout << answer;
}