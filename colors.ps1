Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('c:\Users\mrdev\OneDrive\Desktop\Dimple Bags\logo-hd2.png')
$colors = @{}

for ($x = 0; $x -lt $img.Width; $x += 10) {
    for ($y = 0; $y -lt $img.Height; $y += 10) {
        $c = $img.GetPixel($x, $y)
        if ($c.A -gt 128) {
            $hex = '#{0:X2}{1:X2}{2:X2}' -f $c.R, $c.G, $c.B
            if ($colors.ContainsKey($hex)) {
                $colors[$hex]++
            } else {
                $colors[$hex] = 1
            }
        }
    }
}

$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10 | Format-Table -AutoSize
