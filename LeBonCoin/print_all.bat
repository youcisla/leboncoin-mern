@echo off
(
  for /R %%F in (*) do (
    echo ==== %%F ====
    type "%%F"
    echo.
  )
) > output.txt
