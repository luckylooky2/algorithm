// 대표 선수 : 투 포인터, 정렬
#include <iostream>
#include <vector>

using namespace std;
#define X first
#define Y second
#define ll long long
int n, m;
int arr[1005][1005];
int ans = 0x7f7f7f7f;
vector<int> idx; //각 반에서 현재 단계의 인덱스를 저장하는 벡터
int main(void) {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> n >> m;
    for (int i = 0;i < n;i++) {
        idx.push_back(0);
        for (int j = 0;j < m;j++) cin >> arr[i][j];
    }
    //과정 1
    for (int i = 0;i < n;i++) sort(arr[i], arr[i] + m);
    while (1) {
        int mntm;
        int mx = -1;
        int mn = 0x7f7f7f7f;
        //과정 2
        for (int i = 0;i < n;i++) {
            if (mn > arr[i][idx[i]]) {
                mn = arr[i][idx[i]];
                mntm = i;
            }
            if (mx < arr[i][idx[i]])  mx = arr[i][idx[i]];
        }
        //과정 3
        ans = min(ans, mx-mn);
        //과정 4
        idx[mntm] += 1;
        //과정 5
        if (idx[mntm] == m) break;
    }
    cout << ans;
}