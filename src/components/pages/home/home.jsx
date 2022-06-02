import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import twitter from "../../../assets/image/twitter.svg";
import discord from "../../../assets/image/discord.svg";
import opensea from "../../../assets/image/opensea.svg";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Grid,
  MenuItem,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import nft from "../../../assets/image/nft.svg";
import nft2 from "../../../assets/image/nft2.svg";
import nft3 from "../../../assets/image/nft3.svg";
import nft4 from "../../../assets/image/nft4.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadNfts, getContractDetails } from "../../../utils/getNfts";
import { TransferNFT } from "../../../utils/transferNFT";
import { useWeb3Transfer } from "react-moralis";
import dustbin from "../../../assets/image/dustbin.gif";
import "animate.css";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    width: "100%",
    padding: "2% 8%",
  },
  main: {
    backgroundColor: "#F6BBBB",
    border: "4px solid black",
    borderRadius: "10px",
    width: "100% !important",
    margin: "0px !important",
    padding: "1%",
    justifyContent: "center",
  },
  tabheader: {
    backgroundColor: "#F4F4F4 !important",
    height: "50px",
    minHeight: "50px!important",
  },
  img: {
    width: "107px",
    height: "135px",
    border: "1px solid rgb(0 0 0 / 50%)",
    borderRadius: "3px",
    margin: "0.6%",
  },
  imgSelect: {
    width: "107px",
    height: "135px",
    border: "1px solid rgb(0 0 0 / 50%)",
    borderRadius: "3px",
  },
  div1: {
    backgroundColor: "white",
    overflowY: "auto",
    height: "69vh",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteVal, setDeleteVal] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [nftPosts, setNftPosts] = React.useState([]);

  useEffect(async () => {
    const totalResult = await loadNfts(
      "0xfae46f94ee7b2acb497cecaff6cff17f621c693d"
    );
    const nftArray = [];
    const existContractArray = [];
    const nfts = totalResult.ownedNfts;
    if (totalResult.totalCount > 0) {
      for (let i = 0; i < totalResult.totalCount; i++) {
        let contractTitle = await getContractDetails(nfts[i].contract.address);
        nfts[i].contract.name = contractTitle;
        if (nfts[i].metadata) {
          if (nfts[i].metadata.poster) {
            nfts[i].metadata.video = nfts[i].metadata.image;
            nfts[i].metadata.image = nfts[i].metadata.poster;
            nfts[i].metadata.type = "video";
          } else {
            let nftImage = nfts[i].metadata.image;
            if (nftImage) {
              let ipfs = nftImage.includes("ipfs://");
              if (ipfs) {
                var nftImageArray = nftImage.split("//");
                nftImage = "https://ipfs.io/ipfs/" + nftImageArray[1];
              }
              nfts[i].metadata.image = nftImage;
            }
            nfts[i].metadata.type = "image";
          }
          // console.log("image == ", nfts[i].metadata.image);
          if (existContractArray.indexOf(nfts[i].contract.address) !== -1) {
            const index = existContractArray.findIndex(
              (contract) => contract === nfts[i].contract.address
            );
            let objChild = {
              title: nfts[i].title,
              media: nfts[i].media,
              media: nfts[i].metadata,
            };
            nftArray[index].nfts.push(objChild);
          } else {
            let obj = {
              contract: nfts[i].contract,
              nfts: [
                {
                  title: nfts[i].title,
                  media: nfts[i].media,
                  media: nfts[i].metadata,
                },
              ],
            };
            nftArray.push(obj);
            existContractArray.push(nfts[i].contract.address);
          }
        }
      }
    }
    console.log("nftArray ====", nftArray);
    setNftPosts(nftArray);
  }, []);

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc721",
    receiver: "0x8f9C9fc379e1d265872232A248F5259DC95B4bCd",
    contractAddress: "0x..",
    tokenId: 1,
    amount: 15,
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const posts = [
    {
      title: "ChubbyKaijuDAO",
      collection: [nft, nft2, nft3, nft4, nft, nft2, nft3, nft4],
    },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
    { title: "ChubbyKaijuDAO", collection: [nft, nft2, nft3, nft4] },
    {
      title: "Fine Cats",
      collection: [nft, nft2, nft3, nft4],
    },
  ];
  const collection = [
    { type: "image", image: nft },
    { type: "v", image: nft },
    { type: "v", image: nft },
    { type: "image", image: nft },
  ];
  const price = [
    {
      title: "CHUBBY",
      cost: "0.151",
    },
    {
      title: "CHUBBY",
      cost: "0.151",
    },
  ];
  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "3%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img src={twitter} />
            </IconButton>{" "}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img src={opensea} />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img src={discord} />
            </IconButton>
            <Button variant="text">About</Button>
            <Button variant="text">Soldout</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <Button variant="text">Roadmap</Button>
              <Button variant="text">FAQ</Button>
              <Button variant="text">Marketplace</Button>
              <Button variant="contained">Connect</Button>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      <Grid
        container
        className={classes.main}
        spacing={{ xs: 0, lg: 3, md: 3 }}
      >
        <Grid item xs={12} md={4} lg={4}>
          <div
            style={{
              backgroundColor: "white",
              overflowY: "auto",
              height: "70vh",
              borderRadius: "5px",
            }}
          >
            {nftPosts.map((post, j) => (
              <Accordion key={j}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.tabheader}
                >
                  <Typography style={{ fontFamily: "IBMPlexMono-SemiBold" }}>
                    {post.contract.name
                      ? post.contract.name
                      : "undefined collection"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "4px" }}>
                  {post.nfts.map((data, n) =>
                    data.media.type == "image" ? (
                      <img
                        src={data.media.image}
                        className={classes.img}
                        key={n}
                      />
                    ) : (
                      <video className={classes.img} autoplay controls>
                        <source src={data.media.video} />
                      </video>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            ))}{" "}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "0.3%",
              position: "relative",
              height: "69vh",
            }}
          >
            <div
              style={{
                backgroundColor: "#F4F4F4",
                height: "45px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                fontSize: "20px",
                fontFamily: "IBMPlexMono-SemiBold",
                display: "flex",
                alignItems: "center",
                paddingLeft: "2%",
              }}
            >
              Selected Tokens
            </div>
            <div
              style={{ textAlign: "center" }}
              className={
                deleteVal ? "animate__animated animate__zoomOutDown" : ""
              }
            >
              {collection.map((data, n) =>
                data.type == "image" ? (
                  <img src={data.image} className={classes.img} key={n} />
                ) : (
                  <video className={classes.img} autoplay controls key={n}>
                    <source src={data.image} />
                  </video>
                )
              )}
            </div>
            {deleteVal ? (
              <div
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: "0%",
                  width: "100%",
                }}
              >
                <img src={dustbin} />
              </div>
            ) : (
              <Button
                variant="contained"
                style={{
                  width: "97%",
                  bottom: "12px",
                  position: "absolute",
                  left: "6px",
                }}
              >
                CONFIRM
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "0.3%",
              position: "relative",
              height: "69vh",
            }}
          >
            <div
              style={{
                backgroundColor: "#F4F4F4",
                height: "45px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                fontSize: "20px",
                fontFamily: "IBMPlexMono-SemiBold",
                display: "flex",
                alignItems: "center",
                paddingLeft: "2%",
              }}
            >
              Dont think much
            </div>
            <div style={{ padding: "2%" }}>
              {price.map((priceVal, k) => (
                <span
                  key={k}
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography style={{ fontFamily: "IBMPlexMono-Bold" }}>
                    {priceVal.title}{" "}
                  </Typography>
                  <Typography
                    style={{
                      color: "#FF5C5C",
                      fontFamily: "IBMPlexMono-Bold",
                    }}
                  >
                    {priceVal.cost}
                    {" ETH"}
                  </Typography>
                </span>
              ))}
            </div>
            <Button
              variant="contained"
              startIcon={<DeleteIcon style={{ fontSize: "24px" }} />}
              style={{
                width: "97%",
                bottom: "12px",
                position: "absolute",
                left: "6px",
              }}
              onClick={() => setDeleteVal(true)}
            >
              Just do it
            </Button>
          </div>
        </Grid>

        {/* <Grid item xs={12} md={4} lg={4}>
          <div>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                height: "26vh",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "0.3%",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  height: "45px",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  fontSize: "20px",
                  fontFamily: "IBMPlexMono-SemiBold",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "2%",
                }}
              >
                Dont think much
              </div>
              <div style={{ padding: "2%" }}>
                {price.map((priceVal, k) => (
                  <span
                    key={k}
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography style={{ fontFamily: "IBMPlexMono-Bold" }}>
                      {priceVal.title}{" "}
                    </Typography>
                    <Typography
                      style={{
                        color: "#FF5C5C",
                        fontFamily: "IBMPlexMono-Bold",
                      }}
                    >
                      {priceVal.cost}
                      {" ETH"}
                    </Typography>
                  </span>
                ))}
              </div>
              <Button
                onClick={() => fetch()}
                disabled={isFetching}
                variant="contained"
                startIcon={<DeleteIcon style={{ fontSize: "24px" }} />}
                style={{ position: "absolute", bottom: "5px", width: "98%" }}
              >
                Just do it
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "0.3%",
                position: "relative",
                height: "40vh",
                marginTop: "5%",
              }}
            ></Grid>
          </div>
        </Grid> */}
      </Grid>
    </>
  );
};
export default Home;
