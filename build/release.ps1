Write-Host -Fore 'red' 'Run this script at the root of the directory.'

$manifest = Get-Content 'manifest.json' | ConvertFrom-Json

Write-Host Building $manifest.name $manifest.version ...

7z a -tzip Fukurou.zip
