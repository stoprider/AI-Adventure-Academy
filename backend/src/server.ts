import { app } from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`AI Adventure Academy API running on http://localhost:${PORT}`);
});
