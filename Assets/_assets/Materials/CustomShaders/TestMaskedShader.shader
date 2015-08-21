Shader "Custom/TestShader" {
	 Properties
   {
      _MainTex ("Base (RGB)", 2D) = "white" {}
      _Mask ("Culling Mask", 2D) = "white" {}
      _Cutoff ("Alpha cutoff", Range (0,1)) = 0.1
   }
   SubShader
   {
      Tags {"Queue"="Transparent"}
      Lighting Off
      ZWrite Off
      Blend SrcAlpha OneMinusSrcAlpha
      AlphaTest GEqual [_Cutoff]
      Pass
      {
         SetTexture [_Mask] {combine texture}
         SetTexture [_MainTex] {combine texture, previous}
      }
   }
}

//This simple shader will mask off areas of a texture. This is useful for, say, when you really want to make your minimap round. 
//I've designed it with GUI elements in mind. To make a round object you would:

    //1. put a black border around a white circle and import that into unity.
    //2. Change the texture format to Alpha 8 bit and check "Build Alpha from Grayscale"
    //3. Create a shader with the code below.
    //4. Create a new plane and import your texture on to it.
    //5. Select the shader you created.
    //6. Drop your culling mask in to it. 