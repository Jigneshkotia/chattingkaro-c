import { useState } from "react";
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import toast from "react-hot-toast";
import { useCreateDummyChatMutation, usePreviewDummyChatMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";

const CreateDummyChatDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targetPersonaName, setTargetPersonaName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [previewChat, { isLoading: previewing }] = usePreviewDummyChatMutation();
  const [createChat, { isLoading: creating }] = useCreateDummyChatMutation();
  const busy = previewing || creating;

  const previewHandler = async () => {
    if (!file) return toast.error("Choose an exported WhatsApp .txt file");
    const body = new FormData(); body.append("chatFile", file);
    try {
      const data = await previewChat(body).unwrap();
      setPreview(data); setTargetPersonaName(data.participants[0]?.name || ""); setDisplayName(data.participants[0]?.name || "");
    } catch (error) { toast.error(error?.data?.message || "Could not parse this chat export"); }
  };
  const createHandler = async () => {
    const body = new FormData(); body.append("chatFile", file); body.append("targetPersonaName", targetPersonaName); body.append("displayName", displayName); body.append("bio", bio); body.append("customAvatarUrl", customAvatarUrl);
    try { const data = await createChat(body).unwrap(); toast.success("AI persona is ready"); onClose(); navigate(`/chat/${data.chat._id}`); }
    catch (error) { toast.error(error?.data?.message || "Could not create the AI persona"); }
  };
  return <Dialog open={open} onClose={busy ? undefined : onClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{ display: "flex", gap: 1, alignItems: "center" }}><SmartToyIcon color="primary" /> Create AI Persona</DialogTitle>
    <DialogContent><Stack spacing={2.25} pt={1}>
      {busy && <LinearProgress />}
      {!preview ? <><Typography color="text.secondary">Upload a WhatsApp exported <b>.txt</b> chat. Only select a chat you have permission to use.</Typography>
        <Button component="label" variant="outlined">{file ? file.name : "Select WhatsApp .txt file"}<input hidden type="file" accept=".txt,text/plain" onChange={(event) => setFile(event.target.files?.[0] || null)} /></Button>
        <Button variant="contained" onClick={previewHandler} disabled={!file || busy}>Parse chat</Button></> : <>
        <Alert severity="info">Found {preview.messageCount} messages from {preview.participantCount} participants.</Alert>
        <TextField select label="Person to clone" value={targetPersonaName} onChange={(event) => { setTargetPersonaName(event.target.value); setDisplayName(event.target.value); }}>
          {preview.participants.map(({ name, count }) => <MenuItem key={name} value={name}>{name} ({count} messages)</MenuItem>)}
        </TextField>
        <TextField label="Display name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
        <TextField label="Bio / role" value={bio} onChange={(event) => setBio(event.target.value)} />
        <TextField label="Custom avatar URL (optional)" value={customAvatarUrl} onChange={(event) => setCustomAvatarUrl(event.target.value)} />
        <Box display="flex" alignItems="center" gap={1}><Avatar src={customAvatarUrl}><SmartToyIcon /></Avatar><Typography variant="body2" color="text.secondary">A bot avatar is generated if you leave this empty.</Typography></Box>
      </>}
    </Stack></DialogContent>
    <DialogActions>{preview && <Button onClick={() => setPreview(null)} disabled={busy}>Back</Button>}<Button onClick={onClose} disabled={busy}>Cancel</Button>{preview && <Button variant="contained" onClick={createHandler} disabled={busy || !targetPersonaName}>Create persona</Button>}</DialogActions>
  </Dialog>;
};
export default CreateDummyChatDialog;
