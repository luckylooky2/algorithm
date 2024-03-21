#! bin/bash

declare count_map

js_b=$(find ./baekjoon -type f -name '*[0-9].js' | wc -l | tr -d ' ')
cpp_b=$(find ./baekjoon -type f -name '*[0-9].cpp' | wc -l | tr -d ' ')
c_b=$(find ./baekjoon -type f -name '*[0-9].c' | wc -l | tr -d ' ')
py_b=$(find ./baekjoon -type f -name '*[0-9].py' | wc -l | tr -d ' ')
js_p=$(find ./programmers -type f -name '*.js' | wc -l | tr -d ' ')
cpp_p=$(find ./programmers -type f -name '*.cpp' | wc -l | tr -d ' ')
c_p=$(find ./programmers -type f -name '*.c' | wc -l | tr -d ' ')
py_p=$(find ./programmers -type f -name '*.py' | wc -l | tr -d ' ')

duplicate_b=$(find ./baekjoon -type f -name '*[0-9].*' -exec basename {} \; | sed 's/\..*$//' | sort | uniq -d | wc -l)
duplicate_p=$(find ./programmers -type f -name '*' -exec basename {} \; | sed 's/\..*$//' | sort | uniq -d | wc -l)

arrayByLanguage=($((js_b + js_p)) $((cpp_b + cpp_p)) $((py_b + py_p)) $((c_b + c_p)))
arrayByPlatform=($((js_b + cpp_b + c_b + py_b - duplicate_b)) $((js_p + cpp_p + c_p + py_p - duplicate_p)))

total=0
duplicate=$((duplicate_b + duplicate_p))

for number in "${arrayByLanguage[@]}"; do
  total=$((total + number))
done

echo "
| <div style="width:290px">Language</div>  | # of solved problems |
|:---|---:|
|![](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white)|${arrayByLanguage[0]}|
|![](https://img.shields.io/badge/C++-00599C?style=flat&logo=cplusplus&logoColor=white)|${arrayByLanguage[1]}|
|![](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)|${arrayByLanguage[2]}|
|![](https://img.shields.io/badge/C-A8B9CC?style=flat&logo=c&logoColor=white)|${arrayByLanguage[3]}|
|Total| $((total - duplicate))|

| <div style="width:290px">Platform</div>  | # of solved problems |
|:---|---:|
|![baekjoon]("https://github.com/luckylooky2/algorithm/assets/85822311/e3d22395-a1c3-4006-a99c-b21971b12460")|${arrayByPlatform[0]}|
|![programmers]("https://github.com/luckylooky2/algorithm/assets/85822311/8756ee3f-d246-448f-a379-3d6462503a8e")|${arrayByPlatform[1]}|
|Total| $((total - duplicate))|
" > README.md
