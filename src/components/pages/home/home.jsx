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
import DeleteIcon from "@mui/icons-material/Delete";
import { loadNfts, getContractDetails } from "../../../utils/getNfts";
import { TransferNFT } from "../../../utils/transferNFT";
import { useWeb3Transfer } from "react-moralis";
import wallet from "../../../assets/image/wallet.svg";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import "animate.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  connectWallet,
  getCurrentWalletConnected,
  walletListener,
} from "../../../utils/wallet.js";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    width: "100%",
    padding: "2% 8%",
  },
  main: {
    backgroundColor: "#F6BBBB",
    border: "4px solid black",
    borderRadius: "5px",
    width: "100% !important",
    margin: "0px !important",
    padding: "2% 1%",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      border: "none",
      padding: "0%",
      backgroundColor: "#f6bbbb00",
    },
  },
  tabheader: {
    backgroundColor: "#F4F4F4 !important",
    height: "50px",
    minHeight: "50px!important",
  },
  img: {
    width: "100%",
    height: "135px",
    border: "1px solid rgb(0 0 0 / 50%)",
    margin: "2% 1%",
  },
  imgSelect: {
    width: "100%",
    height: "135px",
    border: "1px solid rgb(0 0 0 / 50%)",
    margin: "2%1%",
  },
  div1: {
    backgroundColor: "white",
    overflowY: "auto",
    height: "69vh",
  },
  collection: {
    [theme.breakpoints.down("sm")]: {
      border: "2px solid black",
      borderRadius: "5px",
      marginBottom: "5% !important",
    },
  },
  subcollection: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.3%",
    position: "relative",
    height: "70vh",

    [theme.breakpoints.down("sm")]: { height: "39vh" },
  },
  appbar: {
    border: "4px solid black",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      border: "2px solid black",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteVal, setDeleteVal] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [nftPosts, setNftPosts] = React.useState([]);
  const [reserveNfts, setReserveNfts] = React.useState([]);
  const [demo, setDemo] = React.useState("");
  const [walletAddress, setWalletAddress] = React.useState("");

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(async () => {
    const { address } = await getCurrentWalletConnected();
    setWalletAddress(address);
    walletListener();
    if (address) {
      const result = await loadNfts(
        "0xA6d873e66874780a03C5Fd7fb86996bb310271bb"
      );
      filterNftArray(result);
    }
    if (window.ethereum) {
      // window.ethereum.on("chainChanged", () => {
      //   console.log("NETWORK: ", getMetamaskNetwork(window.ethereum.chainId));
      // });
      window.ethereum.on("accountsChanged", async () => {
        const { address } = await getCurrentWalletConnected();
        setWalletAddress(address);
        if (address) {
          const result = await loadNfts(address);
          filterNftArray(result);
        }
      });
    }
  }, []);

  async function filterNftArray(totalResult) {
    const nftArray = [];
    const existContractArray = [];
    const nfts = totalResult.ownedNfts;
    const totalNftsCount = totalResult.ownedNfts.length;
    if (totalNftsCount > 0) {
      for (let i = 0; i < totalNftsCount; i++) {
        if (nfts[i]?.contract) {
          let contractTitle = await getContractDetails(
            nfts[i].contract.address
          );
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
            if (existContractArray.indexOf(nfts[i].contract.address) !== -1) {
              const index = existContractArray.findIndex(
                (contract) => contract === nfts[i].contract.address
              );
              let objChild = {
                title: nfts[i].title,
                media: nfts[i].metadata,
                token: nfts[i].id,
              };
              nftArray[index].nfts.push(objChild);
            } else {
              let obj = {
                contract: nfts[i].contract,
                nfts: [
                  {
                    title: nfts[i].title,
                    media: nfts[i].metadata,
                    token: nfts[i].id,
                  },
                ],
              };
              nftArray.push(obj);
              existContractArray.push(nfts[i].contract.address);
            }
          }
        }
      }
    }
    setNftPosts(nftArray);
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
  };

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

  const handleReserveNft = (nft) => {
    var newArray = nft;
    var oldArray = reserveNfts;
    const found = oldArray.some(
      (el) => el.token.tokenId === newArray.token.tokenId
    );
    if (!found) oldArray.push(newArray);
    setReserveNfts(oldArray);
    setDemo(nft);
  };

  const handleRemoveReserveNft = (nft) => {
    var oldArray = reserveNfts;
    oldArray = oldArray.filter(
      (value) => value.token.tokenId != nft.token.tokenId
    );
    setReserveNfts(oldArray);
    setDemo(nft);
  };

  const collection = [
    { type: "image", image: nft },
    { type: "v", image: nft },
    { type: "v", image: nft },
    { type: "image", image: nft },
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
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon style={{ color: "black" }} />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex", xs: "none" } }}>
              <Button variant="text">Roadmap</Button>
              <Button variant="text">FAQ</Button>
              <Button variant="text">Marketplace</Button>
              <Button
                variant="contained"
                onClick={!walletAddress ? connectWalletPressed : ""}
              >
                {walletAddress ? "Connected" : "Connect"}
              </Button>
            </Box>
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <Button
                variant="contained"
                style={{ width: "57px", height: "40px", padding: "1%" }}
              >
                <img src={wallet} />
              </Button>
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
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{ paddingTop: "0px" }}
          className={classes.collection}
        >
          <div
            style={{
              backgroundColor: "white",
              overflowY: "auto",
              height: "70vh",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            {nftPosts.length > 0 ? (
              nftPosts.map((post, j) => (
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
                  <AccordionDetails>
                    <Grid container spacing={{ xs: 0, lg: 2, md: 2 }}>
                      {post.nfts.map((data, n) =>
                        data.media.type == "image" ? (
                          <Grid
                            item
                            xs={3}
                            md={3}
                            lg={3}
                            onClick={() => {
                              handleReserveNft(data);
                            }}
                          >
                            <img
                              src={data.media.image}
                              className={classes.img}
                              key={n}
                            />
                          </Grid>
                        ) : (
                          <Grid
                            item
                            xs={3}
                            md={3}
                            lg={3}
                            onClick={() => {
                              handleReserveNft(data);
                            }}
                          >
                            <video className={classes.img} autoPlay controls>
                              <source src={data.media.video} />
                            </video>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <CircularProgress
                color="secondary"
                style={{ position: "absolute", left: "50%", top: "50%" }}
              />
            )}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{ paddingTop: "0px" }}
          className={classes.collection}
        >
          <div className={classes.subcollection}>
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

            <Grid
              container
              spacing={{ xs: 0, lg: 2, md: 2 }}
              sx={{ padding: "2%", overflowX: "auto", height: "58vh" }}
            >
              {reserveNfts.map((data, n) =>
                data.media.type == "image" ? (
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={3}
                    onClick={() => {
                      handleRemoveReserveNft(data);
                    }}
                  >
                    <img
                      src={data.media.image}
                      className={classes.img}
                      key={n}
                    />
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={3}
                    onClick={() => {
                      handleRemoveReserveNft(data);
                    }}
                  >
                    <video className={classes.img} autoPlay controls key={n}>
                      <source src={data.media.video} />
                    </video>
                  </Grid>
                )
              )}
            </Grid>

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
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          style={{ paddingTop: "0px" }}
          className={classes.collection}
        >
          <div className={classes.subcollection}>
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
            <div style={{ padding: "2%", overflowX: "auto", height: "58vh" }}>
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
                    {"0.05"}
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button variant="text">About</Button>
          <Button variant="text">Soldout</Button>
          <Button variant="text">Roadmap</Button>
          <Button variant="text">FAQ</Button>
          <Button variant="text">Marketplace</Button>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton size="large" edge="start" color="inherit">
            <img src={twitter} />
          </IconButton>{" "}
          <IconButton size="large" edge="start" color="inherit">
            <img src={opensea} />
          </IconButton>
          <IconButton size="large" edge="start" color="inherit">
            <img src={discord} />
          </IconButton>
        </Grid>
      </Menu>
    </>
  );
};
export default Home;
