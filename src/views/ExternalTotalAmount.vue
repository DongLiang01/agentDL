<!--
  Copyright © 2026 TinyTrader. All rights reserved.
  Author: Raymond
  This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('externalTotalAmount.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('externalTotalAmount.search.userType')" clearable style="width: 130px">
          <el-option :label="t('externalTotalAmount.type.nonPartner')" value="non_partner" />
          <el-option :label="t('externalTotalAmount.type.partner')" value="partner" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.currency" :placeholder="t('externalTotalAmount.search.currency')" clearable filterable style="width: 130px">
          <el-option v-for="currency in currencies" :key="currency" :label="'$' + currency" :value="currency" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="-"
          :start-placeholder="t('externalTotalAmount.search.startDate')"
          :end-placeholder="t('externalTotalAmount.search.endDate')"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('externalTotalAmount.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain>{{ t('externalTotalAmount.button.download') }}</el-button>
      </el-form-item>
      <el-form-item class="test">
        <span>{{ t('externalTotalAmount.dataUpdateTime') }}: {{ updateTime }}</span>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300">
      <el-table-column prop="uid" :label="t('externalTotalAmount.table.uid')" width="180" />
      <el-table-column prop="userType" :label="t('externalTotalAmount.table.userType')" width="150" />
      <el-table-column prop="currency" :label="t('externalTotalAmount.table.currency')" width="150" />
      <el-table-column prop="totalExternalDeposit" :label="t('externalTotalAmount.table.totalExternalDeposit')" width="180">
        <template #header>
          <span>{{ t('externalTotalAmount.table.totalExternalDeposit') }}</span>
          <el-tooltip :content="t('externalTotalAmount.table.totalExternalDeposit')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalExternalWithdraw" :label="t('externalTotalAmount.table.totalExternalWithdraw')" width="180">
        <template #header>
          <span>{{ t('externalTotalAmount.table.totalExternalWithdraw') }}</span>
          <el-tooltip :content="t('externalTotalAmount.table.totalExternalWithdraw')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalNodeUsers" :label="t('externalTotalAmount.table.totalNodeUsers')" width="150">
        <template #header>
          <span>{{ t('externalTotalAmount.table.totalNodeUsers') }}</span>
          <el-tooltip :content="t('externalTotalAmount.table.totalNodeUsers')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalExternalDepositUsers" :label="t('externalTotalAmount.table.totalExternalDepositUsers')" width="200" align="center">
        <template #header>
          <span>{{ t('externalTotalAmount.table.totalExternalDepositUsers') }}</span>
          <el-tooltip :content="t('externalTotalAmount.table.totalExternalDepositUsers')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = ref({
  uid: '',
  userType: '',
  currency: '',
  dateRange: []
})

const currencies = ref([
  'AKC', 'AKC4L', 'AKC4S', 'B', 'URL', 'URO', '0G', '10SET', '1INCH', '1INCH6L', '1INCH6S',
  '1LUXE', '1UP', '200', '2KEY', 'A', 'AAVE', 'AAVE6L', 'AAVE6S', 'AC', 'ACA', 'ACE', 'ACE4L',
  'ACE4S', 'AceD', 'ACH', 'ACH3L', 'ACH3S', 'ACT', 'ACX', 'ADA', 'ADA6L', 'ADA6S', 'ADB',
  'ADD', 'ADEL', 'ADOGE', 'AE', 'AE6L', 'AE6S', 'AEVO', 'AEVO4L', 'AEVO4S', 'AFOS', 'AGA',
  'AGEIO', 'AGIX', 'AGIX4L', 'AGIX4S', 'AGLD', 'AGLD4L', 'AGLD4S', 'AGT', 'AI', 'ai16z',
  'AI4L', 'AI4S', 'AIAT', 'AICODE', 'AIDOGE', 'AIDOGE4L', 'AIDOGE4S', 'AIGENIUS', 'AIMX',
  'AIT', 'AITECH', 'AITOM', 'AIXBT', 'AKITA', 'AKRO', 'AKTIO', 'ALD', 'ALEO', 'ALEPH',
  'ALGO', 'ALGO4L', 'ALGO4S', 'ALICE', 'ALPACA', 'ALPACA3L', 'ALPACA3S', 'ALPHA', 'ALPHABET',
  'ALPHANEW', 'ALU', 'AMAS', 'AMO', 'AMO4L', 'AMO4S', 'AMP', 'ANDY', 'ANDY3L', 'ANDY3S',
  'ANIME', 'ANJ', 'ANKR', 'ANOW', 'ANT', 'ANT6L', 'ANT6S', 'ANW', 'APE', 'APE3L', 'APE3S',
  'APECOIN', 'APFC', 'API3', 'API36L', 'API36S', 'APT', 'APT3L', 'APT3S', 'APT6L', 'APT6S',
  'APU', 'APU3L', 'APU3S', 'AR', 'AR4L', 'AR4S', 'ARB', 'ARB4L', 'ARB4S', 'arc', 'ARKM',
  'ARKM3L', 'ARKM3S', 'ARMOR', 'ASCT', 'ASH', 'ASKO', 'ASTER', 'ASTO', 'ASTR', 'ASTR4L',
  'ASTR4S', 'ATH', 'ATLAS', 'ATOM', 'ATOM6L', 'ATOM6S', 'AUCTION4L', 'AUCTION4S', 'AUDIO',
  'AUDIO4L', 'AUDIO4S', 'aUSDT', 'AVACN', 'AVAIL', 'AVAV', 'AVAX', 'AVAX6L', 'AVAX6S', 'AVC',
  'AVH', 'AVNT', 'AXE', 'AXE(NEW)', 'AXIS', 'AXS', 'AXS4L', 'AXS4S', 'B3', 'B360', 'BABY',
  'BABYBONK', 'BABYDOGE', 'BabyEverDoge', 'BAD', 'BADGER', 'BADGER4L', 'BADGER4S', 'BAKE',
  'BAL', 'BAN', 'BANANA', 'BANANA4L', 'BANANA4S', 'BANK', 'BANKBRC', 'BAR', 'BAR4L', 'BAR4S',
  'BART', 'BAT', 'BAT6L', 'BAT6S', 'BAYE', 'BBC', 'BCD', 'BCH', 'BCH3L', 'BCH3LO', 'BCH3S',
  'BCH3SO', 'BCH6L', 'BCH6S', 'BCHA', 'BCOIN', 'BCUT', 'BDG', 'BEAM', 'BEAMX', 'BEAMX4L',
  'BEAMX4S', 'BELIEVE', 'BEN', 'BEN4L', 'BEN4S', 'BEND', 'BEND4L', 'BEND4S', 'BERA', 'BHAO',
  'BIG', 'BIGTIME', 'BIGTIME4L', 'BIGTIME4S', 'BIIS', 'BILLY', 'BILLY3L', 'BILLY3S', 'BIO',
  'BIRD', 'BISO', 'BISO4L', 'BISO4S', 'BIT', 'BIT4L', 'BIT4S', 'BITCOIN', 'BITCOIN4L',
  'BITCOIN4S', 'BK', 'BLUM', 'BLUR', 'BLUR4L', 'BLUR4S', 'BLZE', 'BMG', 'BMW', 'BNB',
  'BNB3L', 'BNB3S', 'BNB6L', 'BNB6S', 'BNBTiger', 'BNBTIGER(1M)', 'BNKR', 'BNT', 'BNT4L',
  'BNT4S', 'BNTDE', 'BNX', 'BNX4L', 'BNX4S', 'BOB', 'BOBO', 'BOM', 'BOME', 'BOME4L', 'BOME4S',
  'BOND', 'BOND4L', 'BOND4S', 'BONDLY', 'BONE', 'BONE4L', 'BONE4S', 'BONK', 'BONK3L', 'BONK3S',
  'BORK', 'BOSON', 'BOT', 'BOTC', 'BOX', 'BP', 'BPRIVA', 'BPVC', 'BRDG', 'BREED', 'BREED3L',
  'BREED3S', 'BRETT', 'BRG', 'BRG(OLD)', 'BRIGHT', 'BRISE', 'Broccoli', 'BRT', 'BSSB',
  'BSSB4L', 'BSSB4S', 'BST', 'BSV', 'BSV3L', 'BSV3S', 'BSV6L', 'BSV6S', 'BTC', 'BTC3L',
  'BTC3S', 'BTC6DOWN', 'BTC6L', 'BTC6S', 'BTC6UP', 'BTCETF', 'BTCMEME', 'BTCRUNES', 'BTE',
  'BTR', 'BTT', 'BUIDL', 'BUIDL(NEW)', 'Bull', 'BUNNY', 'BUNNY(DRC20)', 'BXA', 'BZZ', 'C984L',
  'C984S', 'CAKE', 'CAKE4L', 'CAKE4S', 'CAL4L', 'CAL4S', 'Caldera', 'CANDY', 'CARDI', 'CARV',
  'CASH', 'CashX(CRC20)', 'CAT', 'CAT3L', 'CAT3S', 'CATA', 'CATGOLD', 'CATS', 'CAW', 'CAW3L',
  'CAW3S', 'CBC', 'CBR', 'CCC', 'CCPC', 'CEEK', 'CEL', 'CELO4L', 'CELO4S', 'CELR', 'CELR4L',
  'CELR4S', 'CETUS', 'CFC', 'CFI', 'CFX', 'CFX4L', 'CFX4S', 'CGPT', 'CHAIN', 'CHAT', 'CHEEL',
  'CHEEMS', 'CHEEMS4L', 'CHEEMS4S', 'CHEQ', 'CHI', 'CHICKS', 'CHILLGUY', 'CHZ', 'CHZ4L',
  'CHZ4S', 'CKB', 'CLANKER', 'CLH', 'CMP', 'CNYT', 'COFI', 'COINS', 'COINW', 'COK', 'COMBO',
  'COMP', 'COMP3L', 'COMP3S', 'COMP4L', 'COMP4S', 'CONAN', 'CORE', 'CORE4L', 'CORE4S', 'COVER',
  'COVID', 'CQT', 'CREDIT', 'CREO', 'CRU', 'CRV', 'CRV4L', 'CRV4S', 'CSIX', 'CT', 'CTK',
  'CTK4L', 'CTK4S', 'CTN', 'CTSI', 'CTSI4L', 'CTSI4S', 'CTXC', 'CTXC4L', 'CTXC4S', 'CULT',
  'CULT4L', 'CULT4S', 'CVC', 'CVC4L', 'CVC4S', 'CVNT', 'CVP', 'CVX', 'CVX4L', 'CVX4S',
  'CWIF', 'CWT', 'CXT', 'CYBER', 'CYBER4L', 'CYBER4S', 'D3', 'DAG', 'DAI', 'DAM', 'DAO',
  'DASH', 'DASH3L', 'DASH3S', 'DASH6L', 'DASH6S', 'DAT', 'DATA', 'DCB', 'DCCY', 'DCK', 'DCR',
  'DEC', 'DECENTRALIZED', 'DEFI', 'DeFiM', 'DeFiX', 'DEFROGS', 'DEFROGS3L', 'DEFROGS3S',
  'DEGEN', 'DEGO', 'DEGO4L', 'DEGO4S', 'DETS', 'DEV', 'DEW', 'DF', 'DFIAT', 'DG', 'DGS',
  'DGVC', 'DIA', 'DIGI', 'DIIC', 'DIP', 'DIS', 'DMAIL', 'DMD', 'DMG', 'DMST', 'DNA', 'DNX',
  'DOCK', 'DODO4L', 'DODO4S', 'DOG', 'DOG(RUNE)', 'DOGE', 'DOGE0X', 'DOGE3L', 'DOGE3LO',
  'DOGE3S', 'DOGE3SO', 'DOGE6DOWN', 'DOGE6L', 'DOGE6S', 'DOGE6UP', 'DOGEK', 'DOGEKING',
  'DOGEKINGS', 'DOGEX', 'DOGGY', 'DOGKINGSON', 'DOGS', 'dogwifhat', 'dogwifhat4L', 'dogwifhat4S',
  'DOGZ', 'DOOD', 'DOOK', 'DORDAO', 'DOS', 'DOT', 'DOT3L', 'DOT3LO', 'DOT3S', 'DOT3SO',
  'DOT6L', 'DOT6S', 'DPI', 'DPX', 'DPX4L', 'DPX4S', 'DRAGGY', 'DREP', 'DRIFT', 'DSFG',
  'DTH', 'DTORO', 'DUEL', 'DVI', 'DXD', 'DXGM', 'DYDX', 'DYDX4L', 'DYDX4S', 'EBEN', 'ECL',
  'EDEN', 'EDG', 'EDNS', 'EDU', 'EDU4L', 'EDU4S', 'EET', 'EGG', 'EIGEN', 'EKT', 'ELF',
  'ELIZAOS', 'ELMO', 'ELON', 'ELS', 'ELX', 'EMC', 'EMO', 'ENA', 'ENA4L', 'ENA4S', 'ENJ',
  'ENO', 'ENS', 'ENS4L', 'ENS4S', 'ENSUE', 'EON', 'EOS', 'EOS3L', 'EOS3S', 'EOS6L', 'EOS6S',
  'EOSDAC', 'EPC', 'EPIC', 'EQL', 'ERA', 'ERN', 'ES', 'ESE', 'ETC', 'ETC3L', 'ETC3S',
  'ETC6L', 'ETC6S', 'ETF', 'ETH', 'ETH3L', 'ETH3S', 'ETH3SO', 'ETH6DOWN', 'ETH6L', 'ETH6S',
  'ETH6UP', 'ETHFI', 'ETHFI4L', 'ETHFI4S', 'ETHG', 'ETHS', 'ETHV', 'ETHW', 'ETHW4L', 'ETHW4S',
  'ETR', 'EUL', 'EUL4L', 'EUL4S', 'EURT', 'eXRD', 'F3', 'FAMA', 'FB', 'FCON', 'FEAR',
  'FEARNOT', 'FEG', 'FET', 'FET4L', 'FET4S', 'FETcoin', 'FF', 'FGPT', 'FIDA', 'FIDA3L',
  'FIDA3S', 'FIGHT', 'FIGHT(NEW)', 'FIL', 'FIL3L', 'FIL3S', 'FIL6DOWN', 'FIL6L', 'FIL6S',
  'FIL6UP', 'FILH', 'FILX', 'FINE', 'FINE4L', 'FINE4S', 'FIS', 'FIS4L', 'FIS4S', 'FISH',
  'FISH3L', 'FISH3S', 'FITFI', 'FLAG', 'FLC4L', 'FLC4S', 'FLOKI', 'FLOKI4L', 'FLOKI4S',
  'FLUX', 'FLUX-NEW', 'FNT', 'FNX', 'FODL', 'FOGO', 'FOMO', 'FOR', 'FORM', 'FORM(NEW)',
  'FORT', 'FORTH', 'FOUR', 'FOUR4L', 'FOUR4S', 'FOXY', 'FRAX', 'FRED', 'FROYO', 'FSP', 'FST',
  'FTM', 'FTM6L', 'FTM6S', 'FTT', 'FTT3L', 'FTT3S', 'FTT4L', 'FTT4S', 'FUEL', 'FUKU',
  'FXS', 'FXS4L', 'FXS4S', 'G', 'GAI', 'GAL', 'GALA', 'GALA4L', 'GALA4S', 'GAMI', 'GARI',
  'GARI4L', 'GARI4S', 'GAS', 'GDCC', 'GDP', 'GEAR', 'GEARbox', 'GEEQ', 'GEN', 'GENNEW',
  'GFI', 'GHC', 'GHCW', 'Ghibli', 'GHST', 'GLA', 'GLI', 'GM', 'GME', 'GME3L', 'GME3S',
  'GMT', 'GMT6L', 'GMT6S', 'GMX', 'GMX4L', 'GMX4S', 'GNG', 'GOAT', 'GOATS', 'GOGE', 'GPS',
  'GPX', 'GRAPH', 'GRASS', 'GRIFFAIN', 'GRIFT', 'GRIN', 'GROK', 'GROK4L', 'GROK4S', 'GRT',
  'GRT4L', 'GRT4S', 'GrumpyCatCoin', 'GST', 'GTC', 'GTC4L', 'GTC4S', 'GUMMY', 'GUMMY3L',
  'GUMMY3S', 'GYSR', 'HAIC', 'HAKKA', 'HALO', 'HAM', 'HAVOC', 'HAWKTUAH', 'HBB', 'HBT', 'HC',
  'HDAO', 'hDASH', 'HEGIC', 'HERO', 'HES', 'HEZ', 'HF', 'HFI', 'HFT', 'HFT3L', 'HFT3S',
  'hHC', 'HIGH', 'HIGH4L', 'HIGH4S', 'HIPPO', 'HIT', 'HMTT', 'HO', 'HOBBES', 'HOBBES3L',
  'HOBBES3S', 'HOLD', 'HOME', 'HOOK', 'HOOK3L', 'HOOK3S', 'HOPPY', 'HOPPY3L', 'HOPPY3S',
  'House', 'HPT', 'HPY', 'hQTUM', 'HRC', 'HSK', 'HT', 'HT3L', 'HT3S', 'HT6L', 'HT6S',
  'HTMOON', 'HTX', 'HUMA', 'HW5', 'HX', 'HXA', 'HYPE', 'ICE', 'ICP', 'ICP6L', 'ICP6S',
  'ICPX', 'ID', 'ID4L', 'ID4S', 'IGS', 'IHT', 'IMX', 'IMX4L', 'IMX4S', 'INIT', 'INJ',
  'INJ4L', 'INJ4S', 'INST', 'IOST', 'IP', 'IQ50', 'ISC', 'ISE', 'ISM', 'ISTP', 'JARED',
  'JASMY', 'JENNER', 'JFI', 'JOE', 'JOECOIN', 'JOECOIN4L', 'JOECOIN4S', 'JPC', 'JST', 'JTO',
  'JTO4L', 'JTO4S', 'JUNGLE', 'JUP', 'JUP4L', 'JUP4S', 'JUSTICE', 'JUV', 'JUV4L', 'JUV4S',
  'KAITO', 'KAMA', 'KARMA', 'KAS', 'KAS3L', 'KAS3S', 'KBD', 'KBL', 'KDIA', 'KEEP', 'KEN',
  'KEX', 'KITE', 'KMON', 'KNC', 'KNC4L', 'KNC4S', 'KNINE', 'KOKO', 'KOM', 'KP3R', 'KSM',
  'KSMX', 'KSN', 'KTON', 'KUNCI', 'L3', 'LABUBU', 'LADYS', 'LADYS4L', 'LADYS4S', 'LARRY',
  'LAT', 'LATplaton', 'LAUNCHCOIN', 'LAW', 'LAYER', 'LAZIO', 'LAZIO4L', 'LAZIO4S', 'LEASH',
  'LEEK', 'LEND', 'LEOX', 'LFG', 'LFG4L', 'LFG4S', 'LG', 'LIBERO', 'LID', 'LIME', 'LINEA',
  'LINGO', 'LINK', 'LIT', 'LIT4L', 'LIT4S', 'LKT', 'LMWR', 'LOKA4L', 'LOKA4S', 'LON',
  'LOOKS', 'LOOKS3L', 'LOOKS3S', 'LOOM4L', 'LOOM4S', 'LOWB', 'LPT', 'LQT', 'LRC', 'LRC4L',
  'LRC4S', 'LSP', 'LTC', 'LTC3L', 'LTC3S', 'LTC6DOWN', 'LTC6L', 'LTC6S', 'LTC6UP', 'LTG',
  'LUMIA', 'LUNA', 'LUNA3L', 'LUNA3S', 'LUNC', 'LUNC6L', 'LUNC6S', 'LUNCH', 'LUNCH4L',
  'LUNCH4S', 'LYXe', 'MAG', 'MAGA', 'MAGIC', 'MAGIC3L', 'MAGIC3S', 'MAIL', 'MAIL4L', 'MAIL4S',
  'MAJOR', 'MANA', 'MANA4L', 'MANA4S', 'MANEKI', 'MANEKI3L', 'MANEKI3S', 'MANTA', 'MANTA4L',
  'MANTA4S', 'MANTRA', 'MAPE', 'MARA', 'MARU', 'MASK', 'MASK4L', 'MASK4S', 'MATIC6L',
  'MATIC6S', 'MAV', 'MAV4L', 'MAV4S', 'MAXI', 'MBE', 'MBN', 'MBOX', 'MBT', 'MCHC', 'MCN',
  'MDX', 'MDX4L', 'MDX4S', 'ME', 'MELANIA', 'MEME', 'MEMEBRC', 'MEMECOIN', 'MEMECOIN4L',
  'MEMECOIN4S', 'MEMERUNE', 'MERL', 'MERL3L', 'MERL3S', 'MET', 'MetaDoge', 'Meteora', 'MEW',
  'MFCC', 'MFER', 'MG', 'MGCC', 'MIC', 'MICE', 'MICHI', 'MICHI3L', 'MICHI3S', 'Mikami',
  'MiladyCult', 'MILO', 'MINA', 'MINA6L', 'MINA6S', 'MINI', 'MiniDOGE', 'MINT', 'MINT(NEW)',
  'MINU', 'MIR', 'MIR4L', 'MIR4S', 'MIRA', 'MIST', 'MIX', 'MKR', 'MKR3L', 'MKR3S', 'MKR6L',
  'MKR6S', 'MLN', 'MMC', 'MMVG', 'MNT', 'MNTC', 'MO', 'MOAC', 'MOB4L', 'MOB4S', 'MOBILE',
  'MOBILE4L', 'MOBILE4S', 'mockJUP', 'MOF', 'MON', 'MONG', 'MONTE', 'MOODENG', 'MORPHO',
  'MOTHER', 'MOVE', 'MOVR', 'MP', 'MPC', 'MPH', 'MPLX', 'MPLX3L', 'MPLX3S', 'MRX', 'MSK',
  'MSPC', 'MTA', 'MTC', 'MTOE', 'MTV', 'mubarak', 'MUBI', 'MUBI4L', 'MUBI4S', 'MUTE', 'MVP',
  'MXC', 'MXC4L', 'MXC4S', 'MXNA', 'MYB', 'MYRO', 'MYRO4L', 'MYRO4S', 'NANA', 'NAP', 'NATI',
  'NAVX', 'NEAR', 'NEAR6L', 'NEAR6S', 'NEC', 'NECC', 'NECE', 'NEIRO', 'Neiro(ETH)', 'NEO',
  'NEO6L', 'NEO6S', 'NEST', 'NEWT', 'NEWTON', 'NFEX', 'NFP', 'NFP4L', 'NFP4S', 'NFT',
  'NFTB', 'NFTD', 'NIC', 'NMR', 'NMR4L', 'NMR4S', 'NOM', 'NOT', 'NOT3L', 'NOT3S', 'NPL',
  'NSK', 'NSURE', 'NU', 'NUGS', 'NXPC', 'NYM', 'O3', 'OBT', 'OC', 'OCAI', 'OCEAN', 'OCEAN4L',
  'OCEAN4S', 'OCTO', 'ODOGE', 'ODSR', 'OIN', 'OKB', 'OKB3L', 'OKB3S', 'OKB6L', 'OKB6S',
  'OKT', 'OKT6L', 'OKT6S', 'OKU', 'OLE', 'OLE4L', 'OLE4S', 'OLY', 'OM', 'OMG', 'OMNI',
  'OMNI100', 'OMNI1004L', 'OMNI1004S', 'OMNI4L', 'OMNI4S', 'ONDO', 'ONG', 'ONT', 'OOE',
  'OOKI', 'OP', 'OP4L', 'OP4S', 'OPEN', 'OPIUM', 'OPN', 'OPUL', 'OPUL4L', 'OPUL4S', 'ORBS4L',
  'ORBS4S', 'ORDER', 'ORDI', 'ORDI4L', 'ORDI4S', 'OXT', 'PANDORA', 'PANDORA3L', 'PANDORA3S',
  'PAR', 'PARTI', 'PAW', 'PAXG', 'PAYAI', 'PAYU', 'PBCA', 'PBCB', 'PCX', 'PDS', 'PEAQ',
  'PEARL', 'PEEL', 'PEIPEI', 'PENDLE', 'PENDLE4L', 'PENDLE4S', 'PENGU', 'PEOPLE', 'PEOPLE3L',
  'PEOPLE3S', 'PEPE', 'PEPE4L', 'PEPE4S', 'PEPEBRC', 'PEPES', 'PERP', 'PET', 'PEW', 'PGN',
  'PHA', 'PHB3L', 'PHB3S', 'PHIC', 'PHT', 'PI', 'PI(PiNetwork)', 'PICKLE', 'PICO', 'PIG',
  'PiNetwork', 'PiNetwork3L', 'PiNetwork3S', 'PINEYE', 'PINGU', 'PIT', 'PIXEL', 'PIXEL4L',
  'PIXEL4S', 'PIZABRC', 'PKMON', 'PLANETEER', 'PLC', 'PLCU', 'PLCU(OLD)', 'PLCUC', 'PLCUX',
  'PLM', 'PLU', 'PLUME', 'PMG', 'PMPY', 'PMT', 'PNG', 'PNK', 'PNT', 'PNUT', 'POKE', 'POKT',
  'POL', 'POLYTRADE', 'PONKE', 'PONKE3L', 'PONKE3S', 'POPCAT', 'POPCAT3L', 'POPCAT3S',
  'PORK', 'PORK3L', 'PORK3S', 'PORT3', 'PORTO', 'PORTO4L', 'PORTO4S', 'POWER', 'PRIME',
  'PRIME4L', 'PRIME4S', 'PROMPT', 'PRQ', 'PSG', 'PSG4L', 'PSG4S', 'PSHIB', 'PSTAKE',
  'PSTAKE4L', 'PSTAKE4S', 'PSYOP', 'PSYOP4L', 'PSYOP4S', 'PTC', 'PTERIA', 'PTT', 'PUFFER',
  'PUMP', 'PUMPCORN', 'PUPPIES', 'PUPS', 'QI', 'QI3L', 'QI3S', 'QQ', 'QTC', 'QTUM', 'QTUM3L',
  'QTUM3S', 'QTUM6L', 'QTUM6S', 'RACA', 'RADAR', 'RAIT', 'RARI', 'RARI4L', 'RARI4S',
  'RATS', 'RAY', 'RAY4L', 'RAY4S', 'RCT', 'RDAT', 'RDEX', 'RDNT', 'RDNT4L', 'RDNT4S',
  'RED', 'REKT4L', 'REKT4S', 'REL', 'REN', 'REN4L', 'REN4S', 'RENDER', 'REP', 'RESOLV',
  'RETIK', 'REV3L', 'RFC', 'RFD', 'RFD4L', 'RFD4S', 'RIF4L', 'RIF4S', 'RING', 'RKING',
  'RLY', 'RND', 'RNDR', 'RNDR4L', 'RNDR4S', 'RNT', 'RON', 'RON4L', 'RON4S', 'ROOK', 'ROOST',
  'ROOST4L', 'ROOST4S', 'ROOSTNEW', 'RPG', 'RPL', 'RPL4L', 'RPL4S', 'RSIC', 'RSR', 'RSS3',
  'RUNESXBITCOIN', 'RUNS', 'RVLT', 'RVN', 'RVN6L', 'RVN6S', 'RXT', 'S', 'SACN', 'SAGE',
  'SAHARA', 'SAIX', 'SAND', 'SAND4L', 'SAND4S', 'SANTOS', 'SANTOS4L', 'SANTOS4S', 'SASHIMI',
  'SATOSHI', 'SATS', 'SATS4L', 'SATS4S', 'SBREE', 'SBY', 'SC', 'SCA', 'SCLP', 'SCR',
  'SCRAT', 'SCT', 'SDA', 'SDN', 'SDOG', 'SEAL', 'SEI4L', 'SEI4S', 'SERO', 'SFG', 'SFP4L',
  'SFP4S', 'SFUND', 'SHADOW', 'SHC', 'SHEB', 'SHELL', 'SHIA', 'SHIB', 'SHIB3L', 'SHIB3S',
  'SHIB6L', 'SHIB6S', 'SHIBAI', 'SHIT', 'SHIT4L', 'SHIT4S', 'SHM', 'SIGN', 'SILLY', 'SILLY4L',
  'SILLY4S', 'SKILL', 'SKL', 'SKU', 'SKY', 'SLA', 'SLERF', 'SLERF4L', 'SLERF4S', 'SLINK',
  'SLP', 'SMARS', 'SMART', 'SMILE', 'SMILEY', 'SMILEY4L', 'SMILEY4S', 'SML', 'SNAP',
  'SNAP4L', 'SNAP4S', 'SNM3L', 'SNM3S', 'SNT', 'SNX', 'SNX4L', 'SNX4S', 'SOHI', 'SOL',
  'SOL6L', 'SOL6S', 'Solchat', 'Solchat4L', 'Solchat4S', 'SOLS', 'SOLV', 'SOLVEX', 'SOLX',
  'SON', 'SONIC', 'SOON', 'SOPH', 'SOS', 'SOVRN', 'SPA', 'SPACE', 'SpaceD', 'SPACEPI',
  'SPCT', 'SPK', 'SPONGE', 'SPONGE4L', 'SPONGE4S', 'SPR', 'SPT', 'SPX', 'SQUID', 'SQUIDGROW',
  'SRM', 'SSK', 'SSS', 'SSV', 'SSV4L', 'SSV4S', 'STA', 'STABLE', 'STAKE', 'STARCAT',
  'STARCAT3L', 'STARCAT3S', 'STG', 'STG4L', 'STG4S', 'STM', 'STONK', 'STORJ', 'STOX',
  'STRK', 'STRK4L', 'STRK4S', 'STRM', 'STRONG', 'STX', 'STX4L', 'STX4S', 'SUDO', 'SUDO4L',
  'SUDO4S', 'SUI', 'SUI4L', 'SUI4S', 'SUN', 'SURE', 'SUSHI', 'SUSHI4L', 'SUSHI4S', 'SWAP',
  'SWARMS', 'SWELL', 'SWINGBY', 'SWK', 'SWO', 'SWRV', 'SWTC', 'SWTH', 'SXP', 'SXT', 'SYNC',
  'T', 'T4L', 'T4S', 'TAFT', 'TAI', 'TAIKO', 'TAMA', 'TAPROOT', 'TBE', 'TBS', 'TDG',
  'TEND', 'TET', 'TFT', 'Tfuel', 'THE', 'THETA', 'THETA4L', 'THETA4S', 'THG', 'TIA',
  'TIA4L', 'TIA4S', 'TIFI', 'TIP4L', 'TIP4S', 'TITANX4L', 'TITANX4S', 'TKO4L', 'TKO4S',
  'TLC', 'TLOS', 'TMANIA', 'TNSR', 'TNSR3L', 'TNSR3S', 'TNT', 'TOKAU', 'TOKEN', 'TOKEN4L',
  'TOKEN4S', 'TOMI', 'TON', 'TON4L', 'TON4S', 'TOOLS', 'TORN', 'TORN4L', 'TORN4S',
  'TOWNS', 'TRADE', 'TRB4L', 'TRB4S', 'TREAT', 'TREMP', 'TREMP3L', 'TREMP3S', 'TRIE',
  'TRIO', 'TRIO(Ordinals)', 'TROLL', 'TROLL4L', 'TROLL4S', 'TRU', 'TRU3L', 'TRU3S',
  'TRUCK', 'TRUMP', 'TRUMP(OFFICIAL)', 'TRUMP3L', 'TRUMP3S', 'TRUST', 'TRX', 'TRX3L',
  'TRX3S', 'TRX6L', 'TRX6S', 'TST', 'TURBO', 'TURT', 'TURT4L', 'TURT4S', 'TUSD', 'TwitFi3L',
  'TwitFi3S', 'TWT4L', 'TWT4S', 'TXP', 'UBI', 'UBT', 'UDOGE', 'UFO', 'UIP', 'ULTIMA',
  'ULU', 'UMA', 'UMAMI', 'UMAMI4L', 'UMAMI4S', 'UNC', 'UNCNEW', 'UNI', 'UNI4L', 'UNI4S',
  'UNIBOT', 'UNIBOT3L', 'UNIBOT3S', 'UNIBOT4L', 'UNIBOT4S', 'UNICE', 'UNIFI', 'UNII',
  'UNIX', 'UNIX(DRC20)', 'UNLEASH', 'UNP', 'USD1', 'USDC', 'USDCP', 'USDD', 'USDQ', 'USDR',
  'USDT', 'USDTETF', 'USDTX', 'USTC3L', 'USTC3S', 'UWU', 'VALUE', 'VEMP', 'VENOM', 'VET',
  'VET6L', 'VET6S', 'VGO', 'VIB3L', 'VIB3S', 'VIDT3L', 'VIDT3S', 'VIDYA', 'VINU', 'VIRTUAL',
  'VISTA', 'VITA', 'VITA4L', 'VITA4S', 'VLT', 'VMPX', 'VMPXERC', 'VMPXERC4L', 'VMPXERC4S',
  'VOLT', 'Voolacoin', 'VOXEL4L', 'VOXEL4S', 'VPAD', 'VRA', 'VSYS', 'VTHO', 'VVAIFU', 'W',
  'W4L', 'W4S', 'WAFFLES', 'WAGIEBOT', 'WAGIEBOT4L', 'WAGIEBOT4S', 'WATER', 'WATER3L',
  'WATER3S', 'WCT', 'WCT(NEW)', 'wDOG', 'WDOGE', 'WEMIX', 'WET', 'WEWE', 'WFCA', 'WHALE',
  'WHEN', 'WHITE', 'WHY', 'WHY3L', 'WHY3S', 'WICC', 'WIF', 'WIF4L', 'WIF4S', 'WIFI', 'WIHF',
  'WIN', 'WING', 'WING4L', 'WING4S', 'WISE', 'WLD', 'WLD4L', 'WLD4S', 'WLFI', 'WNXM',
  'WNXM4L', 'WNXM4S', 'WODIU', 'WOFM', 'WOLF', 'WOLF3L', 'WOLF3S', 'WOM', 'WOO4L', 'WOO4S',
  'WOOF', 'WOOF4L', 'WOOF4S', 'WRLD', 'WSB', 'WSB4L', 'WSB4S', 'WSM', 'WSM4L', 'WSM4S',
  'WTF', 'WUSD', 'X', 'X2Y2', 'X2Y24L', 'X2Y24S', 'XAMP', 'XAUT', 'XAVA', 'XCAD', 'XCH',
  'XD', 'XD4L', 'XD4S', 'XDC', 'XDOGE', 'XEN', 'XEN4L', 'XEN4S', 'XETA', 'XETA4L',
  'XETA4S', 'XETA6L', 'XETA6S', 'XIO', 'XION', 'XLM', 'XLM6L', 'XLM6S', 'XMR', 'XMR6L',
  'XMR6S', 'XNK', 'XOR', 'XPET', 'XPET4L', 'XPET4S', 'XPL', 'XRGB', 'XRP', 'XRP3L',
  'XRP3S', 'XRP6L', 'XRP6S', 'XRT', 'XTER', 'XVG', 'XVGETH', 'XVS', 'XVS4L', 'XVS4S',
  'XX', 'XYO', 'YAMA', 'YAMV2', 'YAMV3', 'YAX', 'YB', 'YFI', 'YFI4L', 'YFI4S', 'YFII',
  'YFII3L', 'YFII3S', 'YFIII', 'YFIM', 'YGG', 'YGG4L', 'YGG4S', 'YLT', 'YMI', 'YOYOW',
  'YZY', 'ZCX', 'ZEC', 'ZEC6L', 'ZEC6S', 'ZED', 'ZEE', 'ZEREBRO', 'ZERO', 'ZETA', 'ZIL',
  'ZIL6L', 'ZIL6S', 'ZIZY', 'ZK', 'ZK3L', 'ZK3S', 'ZKB', 'ZKJ', 'ZKS', 'ZKS4L', 'ZKS4S',
  'ZORA', 'ZRC', 'ZRO', 'ZRO3L', 'ZRO3S', 'ZRX', 'ZUKI', 'ZXC', 'ZZ', 'ZZ4L', 'ZZ4S'
])

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(1)
const updateTime = ref('2026-03-13 15:50:00')

onMounted(() => {
  subscribe((newTheme) => {
    tableKey.value = newTheme
  })
})
</script>

<style scoped>
.content {
  padding: 20px;
}

.demo-form-inline {
  margin-bottom: 20px;
}

.demo-form-inline .el-form-item {
  margin-bottom: 10px;
}

.test {
  margin-left: auto;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  clear: both;
  padding: 10px 0;
  min-height: 32px;
}

:deep(.el-table) {
  font-size: 12px;
}

:deep(.el-table__empty-text) {
  font-size: 14px;
}

:deep(.el-icon-question) {
  margin-left: 5px;
  cursor: pointer;
  color: var(--theme-text-secondary);
}

:deep(.el-tooltip) {
  white-space: pre-wrap;
}
</style>
