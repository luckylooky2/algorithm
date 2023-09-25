// 내려가기 : 동적 계획법, 슬라이딩 윈도우
#include <iostream>
#include <algorithm>
#include <string>
#include <sstream>
#include <strings.h>

using namespace std;

int main() {
	cin.tie(0);
	ios::sync_with_stdio(0);

    int n;
    cin >> n;
	cin.ignore();
    
    int dp[3][2][2];
	int arr[3];
    const int MIN = 0, MAX = 1;
    bzero(dp, sizeof(dp));
    for (int i = 0; i < n; i++) {
		stringstream ss;
		string	tmp;

		getline(cin,tmp);
		ss.str(tmp);
		for (int j = 0; j < 3; j++)
			ss >> arr[j];
		for (int k = 0; k < 3; k++)
		{
			if (k == 0) {
				dp[k][1][MIN] = min(dp[0][0][MIN], dp[1][0][MIN]);
				dp[k][1][MAX] = max(dp[0][0][MAX], dp[1][0][MAX]);
			} else if (k == 1) {
				dp[k][1][MIN] = min(dp[0][0][MIN], min(dp[1][0][MIN], dp[2][0][MIN]));
				dp[k][1][MAX] = max(dp[0][0][MAX], max(dp[1][0][MAX], dp[2][0][MAX]));
			} else {
				dp[k][1][MIN] = min(dp[1][0][MIN], dp[2][0][MIN]);
				dp[k][1][MAX] = max(dp[1][0][MAX], dp[2][0][MAX]);
			}
		dp[k][1][MIN] += arr[k];
		dp[k][1][MAX] += arr[k];
		}
		for (int l = 0; l < 3; l++)
		{
			dp[l][0][MIN] = dp[l][1][MIN];
			dp[l][0][MAX] = dp[l][1][MAX];
		}
    }
    
    int maxResult = max(dp[0][0][MAX], max(dp[1][0][MAX], dp[2][0][MAX]));
    int minResult = min(dp[0][0][MIN], min(dp[1][0][MIN], dp[2][0][MIN]));
    
    cout << maxResult << " " << minResult << endl;
    
    return 0;
}