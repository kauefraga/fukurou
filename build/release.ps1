Write-Host -Fore 'red' 'Run this script at the root of the directory.'

$manifest = Get-Content 'manifest.json' | ConvertFrom-Json

Write-Host Building $manifest.name $manifest.version ...

# Zips using 7zip
7z a -tzip 'Fukurou.zip' 'manifest.json' 'LICENSE' 'src'

# Add images excluding readme ones
7z u 'Fukurou.zip' -xr'!images/docs' 'images'
