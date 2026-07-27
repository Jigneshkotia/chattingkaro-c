import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transformImage } from '../../lib/features'

const AvatarCard = ({avatar= [], max = 4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
        <AvatarGroup max={max} spacing={15} sx={{
            position:"relative",
        }} >
            <Box width={"5rem"} height={"3rem"}>
                {avatar.map((i, index)=>(
                    <Avatar
                    key={`${i}-${index}`}
                    src={transformImage(i)}
                    alt={`avatar ${index}`}
                    sx={{
                        width: "3rem",
                        height: "3rem",
                        position: "absolute",
                        left: {
                            xs: `${0.5 + index}rem`,
                            sm: `${index}rem`
                        },
                        border : "2px solid #ffffff",
                        boxShadow: "0 2px 6px rgba(22,27,51,0.15)",
                    }}
                />
                ))}
            </Box>
        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard