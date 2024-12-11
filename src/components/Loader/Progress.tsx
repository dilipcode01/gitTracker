import { Box, Spinner } from "@radix-ui/themes";

const Loading = ({ size = 40}: { size?: number | string, color?: string }) => {
  return (
    <Box
      className="flex justify-center items-center"
    >
      <Spinner  size={size} loading={true} style={{color:"blue"}}/>
    </Box>
  );
};

export default Loading;
