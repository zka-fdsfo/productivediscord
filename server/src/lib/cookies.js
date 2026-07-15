export function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
  });
}

export function clearAuthCookies(res) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
}
